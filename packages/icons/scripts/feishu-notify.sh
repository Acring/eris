changelog="$1 版本发布\n\n $(awk '/^## /{n++}{if(n==1)print}' CHANGELOG.md)"

# 手动转义特殊字符和换行符
escaped_changelog=$(echo "$changelog" | sed 's/"/\\"/g' | awk '{printf (NR==1 ? "" : "\\n") $0}')

# 构建 JSON 数据
json_data="{\"msg_type\": \"text\", \"content\": {\"text\": \"$escaped_changelog\"}}"

curl -X POST -H "Content-Type: application/json" \
  -d "$json_data" \
  "$2"
