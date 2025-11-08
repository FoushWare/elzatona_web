#!/usr/bin/env python3
"""Run the build-check-and-push script and display output in real-time"""
import subprocess
import sys
import os

os.chdir('/Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web')

print("=" * 60)
print("Running build-check-and-push script")
print("=" * 60)
print()

# Run the script and stream output
process = subprocess.Popen(
    ['bash', '.cursor/check-build-and-push.sh'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    universal_newlines=True,
    bufsize=1
)

# Stream output line by line
for line in process.stdout:
    print(line, end='')
    sys.stdout.flush()

# Wait for completion
process.wait()
print()
print("=" * 60)
print(f"Script completed with exit code: {process.returncode}")
print("=" * 60)

sys.exit(process.returncode)

