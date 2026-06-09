# Basic CRM Plan

```bash
crm-adapter-kit summary --adapter fixtures/sample.json
crm-adapter-kit list-contacts --adapter fixtures/sample.json --query Ada
crm-adapter-kit plan-task --adapter fixtures/sample.json --contact "Ada Lovelace" --follow-up "Send deck"
```
