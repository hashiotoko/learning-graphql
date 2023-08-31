import fetch from 'node-fetch';
import fs from 'fs';

const ENDPOINT = process.argv[2];

if (!ENDPOINT) {
  console.error('第１引数にエンドポイントを指定してください。');
  process.exit(1);
}

const queryFileName = process.argv[3];

if (!queryFileName) {
  console.error('第２引数にクエリファイル名を指定してください。');
  process.exit(1);
}

// query.graphql ファイルからクエリを読み込む
const QUERY = fs.readFileSync(queryFileName, 'utf8');

async function fetchGraphQLData() {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 必要に応じて他のヘッダーを追加
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
      },
      body: JSON.stringify({
        query: QUERY,
      }),
    });

    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('GraphQL API の呼び出し中にエラーが発生しました:', error);
  }
}

fetchGraphQLData();
