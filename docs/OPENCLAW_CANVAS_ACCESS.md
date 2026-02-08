# OpenClaw Canvas Access & Canvas Setup

Summary

You successfully used SSH local port forwarding to access the OpenClaw Canvas running on the VM from your laptop. This document records the tunnel command you used, how to open Canvas in your browser, and the next steps to add canvases that let users switch models at runtime (no SSH required).

1. SSH local port forward (what you ran)

On your laptop run:

```bash
ssh -i ~/.ssh/id_rsa -L 18789:localhost:18789 azureuser@104.40.244.55
```

Keep that SSH session open. Then open in your browser:

- http://127.0.0.1:18789/__openclaw__/canvas/

This forwards the VM's localhost:18789 to your laptop's localhost:18789 so you can use the Canvas UI locally.

2. Verify the gateway (commands to run on VM if needed)

If you need to debug on the VM (SSH session):

```bash
systemctl --user status openclaw-gateway --no-pager
journalctl --user -u openclaw-gateway -n 200 --no-pager
ss -ltnp | grep 18789 || sudo ss -ltnp | grep 18789
curl -v http://127.0.0.1:18789/__openclaw__/canvas/
```

3. Create a runtime `set-model` Canvas (no SSH required)

Use the Canvas UI at the URL above and create a new canvas named `set-model` with these blocks:

- Input block
  - Prompt: `Enter the model name (examples: gpt-4.1, opus-4.5)`
  - Save input variable: `model`

- Set Memory block
  - Target: `session` (or `user` for persistent preference)
  - Key: `preferred_model`
  - Value: `{{model}}`

- Reply block
  - Text: `Model set to {{model}}. Use show-model to verify.`

Save the canvas.

4. Optional: `show-model` canvas

Create `show-model` to read and display the memory value:

- Read Memory block (key: `preferred_model` from `session` or `user`)
- Reply block: `Preferred model: {{preferred_model}}`

5. How to use from Telegram

- Open your bot chat (the bot is paired) and run the Canvas via the Canvas launcher or via the chat's canvas command (if your OpenClaw maps canvas triggers to chat commands). Enter `gpt-4.1` or `opus-4.5` when prompted.
- Use `show-model` to confirm the saved value.

6. If OpenClaw refuses to use the model ("Model ... is not allowed")

- The gateway is likely enforcing an allowlist of model names. The canvas will still store `preferred_model`, but the runtime must be configured to accept that model or a small session-start hook must be added so the gateway can apply the preference.
- To fix the allowlist or apply the model automatically requires a small server-side change (edit `~/.openclaw/openclaw.json` or add a hook). I can provide the exact hook code (small) and the single install command; that requires SSH access to drop the file and restart the gateway.

7. Next recommended steps

- Test: set a model with the `set-model` canvas and run `show-model` to confirm.
- If you get the "not allowed" error in logs, either (A) let me produce the hook to apply `session.preferred_model` at session start (I will provide code + one-line install), or (B) re-enable SSH and I will update the allowlist directly.

If you want, I will now generate the importable Canvas JSON you can paste into the Canvas UI (one file) or the small hook code to auto-apply `preferred_model`. Reply with `canvas-import` or `hook`.
