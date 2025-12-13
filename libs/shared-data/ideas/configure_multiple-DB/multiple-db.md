# Applying the Dependency Inversion Principle for Multi-Database Support

Based on [José Miguel Álvarez Vañó's article](https://dev.to/jmalvarez/dependency-inversion-principle-in-typescript-4nm0).  
This document demonstrates how to apply the **Dependency Inversion Principle (DIP)** to make your project flexible enough to switch between **SQL and NoSQL databases**, such as **Firebase (NoSQL)** and **Supabase (PostgreSQL)**.

---

## 🧠 Goal

Design a data layer that depends on **abstractions** rather than **concrete database implementations**, allowing easy switching between Firebase and Supabase.

---

## 🧩 Project Structure

```
src/
 ├── services/
 │    ├── database/
 │    │     ├── IDatabaseService.ts
 │    │     ├── FirebaseDatabaseService.ts
 │    │     └── SupabaseDatabaseService.ts
 │    └── index.ts
 ├── context/
 │    └── DatabaseContext.tsx
 ├── hooks/
 │    └── useDatabase.ts
 ├── config/
 │    └── appConfig.ts
 └── App.tsx
```

---

## ⚙️ Step 1: Create the Abstraction

**File:** `IDatabaseService.ts`

```ts
export interface IDatabaseService {
  get<T>(collection: string, id: string): Promise<T | null>;
  getAll<T>(collection: string): Promise<T[]>;
  add<T>(collection: string, data: T): Promise<void>;
  update<T>(collection: string, id: string, data: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
}
```

---

## ⚙️ Step 2: Implement Firebase Database Service

**File:** `FirebaseDatabaseService.ts`

```ts
import { IDatabaseService } from "./IDatabaseService";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore();

export class FirebaseDatabaseService implements IDatabaseService {
  async get<T>(collectionName: string, id: string): Promise<T | null> {
    const ref = doc(db, collectionName, id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? (snapshot.data() as T) : null;
  }

  async getAll<T>(collectionName: string): Promise<T[]> {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async add<T>(collectionName: string, data: T): Promise<void> {
    await addDoc(collection(db, collectionName), data);
  }

  async update<T>(
    collectionName: string,
    id: string,
    data: Partial<T>,
  ): Promise<void> {
    await updateDoc(doc(db, collectionName, id), data);
  }

  async delete(collectionName: string, id: string): Promise<void> {
    await deleteDoc(doc(db, collectionName, id));
  }
}
```

---

## ⚙️ Step 3: Implement Supabase Database Service

**File:** `SupabaseDatabaseService.ts`

```ts
import { createClient } from "@supabase/supabase-js";
import { IDatabaseService } from "./IDatabaseService";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_KEY!,
);

export class SupabaseDatabaseService implements IDatabaseService {
  async get<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }

  async getAll<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data ?? [];
  }

  async add<T>(table: string, data: T): Promise<void> {
    const { error } = await supabase.from(table).insert(data);
    if (error) throw error;
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<void> {
    const { error } = await supabase.from(table).update(data).eq("id", id);
    if (error) throw error;
  }

  async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
  }
}
```

---

## ⚙️ Step 4: Dependency Injection via Context

**File:** `DatabaseContext.tsx`

```tsx
import React, { createContext, useContext } from "react";
import { IDatabaseService } from "@/services/database/IDatabaseService";
import { FirebaseDatabaseService } from "@/services/database/FirebaseDatabaseService";
import { SupabaseDatabaseService } from "@/services/database/SupabaseDatabaseService";

const isFirebase = import.meta.env.VITE_USE_FIREBASE === "true";

const databaseService: IDatabaseService = isFirebase
  ? new FirebaseDatabaseService()
  : new SupabaseDatabaseService();

const DatabaseContext = createContext<IDatabaseService>(databaseService);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <DatabaseContext.Provider value={databaseService}>
    {children}
  </DatabaseContext.Provider>
);

export const useDatabase = () => useContext(DatabaseContext);
```

---

## ✅ Benefits

- Easily switch between Firebase and Supabase by changing `.env`:
  ```env
  VITE_USE_FIREBASE=true
  ```
- High-level components are **decoupled** from database details.
- Supports **testing and mocking** easily.
- Adheres strictly to **SOLID principles**.

---

**Author:** Adapted for multi-database support by _AFouad_, based on concepts by José Miguel Álvarez Vañó.  
**Date:** 2025-10-18
