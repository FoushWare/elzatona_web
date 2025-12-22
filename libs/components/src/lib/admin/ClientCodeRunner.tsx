"use client";

import React, { useState, useEffect, useRef } from "react";

export interface TestCase {
  id: string;
  input: unknown[]; // arguments array
  expected: unknown; // expected return value
  description?: string;
}

export interface ClientCodeRunnerProps {
  functionName: string; // e.g., 'twoSum'
  userCode: string; // function implementation as string
  testCases: TestCase[];
}

interface TestResult {
  id: string;
  passed: boolean;
  actual: unknown;
  expected: unknown;
  error?: string;
  elapsedMs?: number;
}

// v1.0
export default function ClientCodeRunner({
  functionName,
  userCode,
  testCases,
}: ClientCodeRunnerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [customInput, setCustomInput] = useState<string>("");
  const [customResult, setCustomResult] = useState<TestResult | null>(null);
  const origin = globalThis.window.location.origin;

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== origin) {
        console.warn("Received message from untrusted origin:", e.origin);
        return;
      }
      if (!e.data) return;

      if (e.data.type === "runner:results") {
        setRunning(false);
        setResults(e.data.results as TestResult[]);
      }

      if (e.data.type === "runner:custom:result") {
        setRunning(false);
        setCustomResult(e.data.result as TestResult);
      }
    };

    globalThis.window.addEventListener("message", handleMessage);
    return () =>
      globalThis.window.removeEventListener("message", handleMessage);
  }, [origin]);

  const run = () => {
    setRunning(true);
    setResults([]);

    const iframe = iframeRef.current;
    if (!iframe) return;

    const safeCode = userCode
      .replace(/import\s+[^;]+;?/g, "")
      .replace(/export\s+default\s+/g, "")
      .replace(/export\s+\{[^}]*\};?/g, "")
      .replace(/export\s+\w+\s+/g, "");

    const payload = {
      fnName: functionName,
      code: safeCode,
      tests: testCases,
    };

    iframe.contentWindow?.postMessage(
      { type: "runner:start", payload },
      window.location.origin, // Use specific origin for better security
    );
  };

  const srcDoc =
    "<!doctype html>" +
    '<html><head><meta charset="utf-8"/></head><body>' +
    "<script>\n" +
    "function deepEqual(a,b){try{return JSON.stringify(a)===JSON.stringify(b)}catch(e){return false}}\n" +
    // SECURITY NOTE: eval() is used here for educational code execution in an iframe sandbox.
    // The code runs in an isolated iframe (srcDoc) with timeout protection and minimal globals.
    // This is intentional for allowing users to test their code solutions.
    // Consider implementing additional sandboxing measures (CSP, worker threads) for production.
    "function safeEval(code){return (0,eval)(code)}\n" +
    'function withTimeout(fn,args,ms){return new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error("Timeout")),ms);try{const res=fn.apply(null,args);Promise.resolve(res).then(v=>{clearTimeout(t);resolve(v)}).catch(err=>{clearTimeout(t);reject(err)});}catch(err){clearTimeout(t);reject(err);}})}\n' +
    'window.addEventListener("message",async(e)=>{\n' +
    '  if(!e.data||e.data.type!=="runner:start")return;\n' +
    "  const {fnName,code,tests}=e.data.payload;\n" +
    "  let fn; let results=[];\n" +
    "  try{\n" +
    "    // sandbox minimal globals\n" +
    "    const console={log:()=>{},error:()=>{},warn:()=>{},info:()=>{}};\n" +
    "    safeEval(code);\n" +
    "    fn=eval(fnName);\n" +
    "  }catch(err){\n" +
    "    results=tests.map(t=>({id:t.id,passed:false,actual:null,expected:t.expected,error:String(err)}));\n" +
    '    parent.postMessage({type:"runner:results",results},window.location.origin);\n' +
    "    return;\n" +
    "  }\n" +
    "  for(const t of tests){\n" +
    "    try{\n" +
    "      const args=Array.isArray(t.input)?t.input:[t.input];\n" +
    "      const start=performance.now();\n" +
    "      const actual=await withTimeout(fn,args,1500);\n" +
    "      const elapsed=performance.now()-start;\n" +
    "      const passed=deepEqual(actual,t.expected);\n" +
    "      results.push({id:t.id,passed,actual,expected:t.expected,elapsedMs:Math.round(elapsed)});\n" +
    "    }catch(err){\n" +
    "      results.push({id:t.id,passed:false,actual:null,expected:t.expected,error:String(err),elapsedMs:0});\n" +
    "    }\n" +
    "  }\n" +
    '  parent.postMessage({type:"runner:results",results},window.location.origin);\n' +
    "});\n" +
    "// custom single-run handler\n" +
    'window.addEventListener("message",async(e)=>{\n' +
    '  if(!e.data||e.data.type!=="runner:custom")return;\n' +
    "  const {fnName,code,input}=e.data.payload;\n" +
    '  try{safeEval(code);}catch(err){parent.postMessage({type:"runner:custom:result",result:{id:"custom",passed:false,actual:null,expected:null,error:String(err),elapsedMs:0}},window.location.origin);return;}\n' +
    '  let fn;try{fn=eval(fnName);}catch(err){parent.postMessage({type:"runner:custom:result",result:{id:"custom",passed:false,actual:null,expected:null,error:String(err),elapsedMs:0}},window.location.origin);return;}\n' +
    '  try{const args=Array.isArray(input)?input:[input];const start=performance.now();const actual=await withTimeout(fn,args,1500);const elapsed=performance.now()-start;parent.postMessage({type:"runner:custom:result",result:{id:"custom",passed:true,actual,expected:null,elapsedMs:Math.round(elapsed)}},window.location.origin);}catch(err){parent.postMessage({type:"runner:custom:result",result:{id:"custom",passed:false,actual:null,expected:null,error:String(err),elapsedMs:0}},window.location.origin);}\n' +
    "});\n" +
    "<\/script>" +
    "</body></html>";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={run}
          disabled={running}
          className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {running ? "Running…" : "Run Tests"}
        </button>
        <span className="text-sm text-gray-500">Client sandbox (iframe)</span>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        className="w-0 h-0 border-0"
        title="runner"
      />
      <div className="flex items-start gap-2">
        <textarea
          placeholder="Custom input as JSON array, e.g. [ [2,7,11,15], 9 ]"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="flex-1 min-h-[56px] bg-gray-900 border border-gray-700 rounded p-2 text-sm font-mono"
        />
        <button
          onClick={() => {
            setRunning(true);
            setCustomResult(null);
            let parsed;
            try {
              parsed = customInput ? JSON.parse(customInput) : [];
            } catch (err) {
              setRunning(false);
              setCustomResult({
                id: "custom",
                passed: false,
                actual: null,
                expected: null,
                error: err instanceof Error ? err.message : "Invalid JSON",
                elapsedMs: 0,
              });
              return;
            }
            const iframe = iframeRef.current;
            if (!iframe) {
              setRunning(false);
              return;
            }
            const safeCode = userCode
              .replace(/import\s+[^;]+;?/g, "")
              .replace(/export\s+default\s+/g, "")
              .replace(/export\s+\{[^}]*\};?/g, "")
              .replace(/export\s+\w+\s+/g, "");
            iframe.contentWindow?.postMessage(
              {
                type: "runner:custom",
                payload: {
                  fnName: functionName,
                  code: safeCode,
                  input: parsed,
                },
              },
              window.location.origin, // Use specific origin for better security
            );
          }}
          className="px-3 py-2 rounded bg-emerald-600 text-white"
        >
          Run Custom
        </button>
      </div>
      {customResult && (
        <div className="text-sm rounded border border-gray-700 p-2">
          <div
            className={
              (customResult.passed ? "text-green-500" : "text-red-500") +
              " font-medium"
            }
          >
            {customResult.passed ? "EXECUTED" : "ERROR"}{" "}
            {customResult.elapsedMs ? `(${customResult.elapsedMs} ms)` : ""}
          </div>
          <div className="text-gray-300">
            Actual: {formatVal(customResult.actual)}
          </div>
          {customResult.error && (
            <div className="text-red-400">{customResult.error}</div>
          )}
        </div>
      )}
      <div className="rounded border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="text-left p-2">Test</th>
              <th className="text-left p-2">Result</th>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">Actual</th>
              <th className="text-left p-2">Expected</th>
              <th className="text-left p-2">Error</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t border-gray-700">
                <td className="p-2">{r.id}</td>
                <td
                  className={
                    "p-2 " + (r.passed ? "text-green-500" : "text-red-500")
                  }
                >
                  {r.passed ? "PASS" : "FAIL"}
                </td>
                <td className="p-2 text-gray-400">{r.elapsedMs ?? ""}</td>
                <td className="p-2 text-gray-300">{formatVal(r.actual)}</td>
                <td className="p-2 text-gray-300">{formatVal(r.expected)}</td>
                <td className="p-2 text-red-400">{r.error || ""}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td className="p-3 text-gray-400" colSpan={5}>
                  No results yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatVal(v: unknown): string {
  try {
    return typeof v === "string" ? v : JSON.stringify(v);
  } catch {
    return String(v);
  }
}
