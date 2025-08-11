yarn clean && yarn build:js:cjs && yarn build:js:esm
# 兼容 node 16以下版本
mv dist/cjs/ConfigProvider.d.ts ./
echo "build success"
