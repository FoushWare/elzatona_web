#!/usr/bin/env python3
"""
Git History Secret Scanner
Searches git history for exposed API keys, secrets, and tokens
"""

import subprocess
import sys
import re
from typing import List, Tuple

# Patterns to search for
PATTERNS = {
    "Firebase API Key": r"AIzaSy[A-Za-z0-9_-]{35}",
    "JWT Token (Supabase)": r"YOUR_SUPABASE_KEY_HERE\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+",
    "Service Role Key": r"process.env.SUPABASE_SERVICE_ROLE_KEY",
    "Supabase Project Ref": r"hpnewqkvpnthpohvxcmq",
    "Firebase Project ID": r"fir-demo-project-adffb",
    "Hardcoded JWT Secret": r"elzatona-super-secret-jwt-key-2024-production-ready",
    "Hardcoded NextAuth Secret": r"elzatona-nextauth-secret-2024-production-ready",
}

# Specific known secrets to search for
KNOWN_SECRETS = [
    "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
    "YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s",
    "process.env.SUPABASE_SERVICE_ROLE_KEY",
]


def run_git_command(cmd: List[str]) -> Tuple[str, str, int]:
    """Run a git command and return stdout, stderr, and return code"""
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=60,
            cwd="."
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        return "", "Command timed out", 1
    except Exception as e:
        return "", str(e), 1


def search_for_secret(secret: str, description: str) -> List[str]:
    """Search git history for a specific secret"""
    print(f"\n🔍 Searching for: {description}")
    print(f"   Pattern: {secret[:50]}...")
    
    commits = []
    
    # Search using git log -S
    stdout, stderr, code = run_git_command([
        "git", "log", "--all", "-p", "-S", secret, "--oneline"
    ])
    
    if code == 0 and stdout:
        lines = stdout.split('\n')
        for line in lines:
            if line.startswith(('commit', 'Merge', 'fix', 'feat', 'docs', 'chore', 'refactor')):
                if line not in commits:
                    commits.append(line)
    
    return commits


def search_in_commit_messages() -> List[str]:
    """Search commit messages for secret-related keywords"""
    print("\n🔍 Searching commit messages...")
    
    keywords = ["secret", "key", "password", "token", "api", "credential"]
    commits = []
    
    for keyword in keywords:
        stdout, stderr, code = run_git_command([
            "git", "log", "--all", "--oneline", "--grep", keyword, "-i"
        ])
        
        if code == 0 and stdout:
            for line in stdout.strip().split('\n'):
                if line and line not in commits:
                    commits.append(line)
    
    return commits


def main():
    print("=" * 70)
    print("🔒 Git History Secret Scanner")
    print("=" * 70)
    
    all_findings = {}
    
    # Search for known secrets
    print("\n📋 Searching for known secrets...")
    for secret in KNOWN_SECRETS:
        description = "Known Secret"
        if "AIzaSy" in secret:
            description = "Firebase API Key"
        elif "YOUR_SUPABASE_KEY_HERE" in secret:
            description = "Supabase Anon Key"
        elif "process.env.SUPABASE_SERVICE_ROLE_KEY" in secret:
            description = "Supabase Service Role Key"
        
        commits = search_for_secret(secret, description)
        if commits:
            all_findings[description] = commits
            print(f"   ⚠️  Found in {len(commits)} commit(s)")
        else:
            print(f"   ✅ Not found")
    
    # Search commit messages
    msg_commits = search_in_commit_messages()
    if msg_commits:
        all_findings["Commit Messages"] = msg_commits
        print(f"   ⚠️  Found {len(msg_commits)} commit(s) with secret-related keywords")
    else:
        print(f"   ✅ No suspicious commit messages found")
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 Summary")
    print("=" * 70)
    
    if all_findings:
        print("\n⚠️  SECRETS FOUND IN GIT HISTORY!")
        print("\nFound secrets in the following categories:")
        for category, commits in all_findings.items():
            print(f"\n{category}:")
            for commit in commits[:10]:  # Show first 10
                print(f"  - {commit}")
            if len(commits) > 10:
                print(f"  ... and {len(commits) - 10} more")
        
        print("\n" + "=" * 70)
        print("🚨 ACTION REQUIRED:")
        print("=" * 70)
        print("1. ⚠️  ROTATE ALL EXPOSED KEYS IMMEDIATELY")
        print("   - Supabase: Regenerate service_role and anon keys")
        print("   - Firebase: Regenerate API keys")
        print("   - JWT: Generate new secrets")
        print("\n2. 📝 Remove secrets from git history")
        print("   See: .cursor/scripts/remove-secrets-from-git-history.md")
        print("\n3. 🔒 Set up git-secrets to prevent future commits")
        print("   Run: brew install git-secrets && git secrets --install")
    else:
        print("\n✅ No secrets found in git history!")
        print("   (This is good, but continue to be vigilant)")
    
    print("\n" + "=" * 70)
    return 0 if not all_findings else 1


if __name__ == "__main__":
    sys.exit(main())

