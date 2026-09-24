# How to create an MkDocs Project

## Prerequisite

Make sure UV and python related setup is up

### Commands

```bash
uv init my-docs --no-package
cd my-docs
uv add mkdocs mkdocs-material
uv run mkdocs new .
uv run mkdocs serve
uv run mkdocs build
```