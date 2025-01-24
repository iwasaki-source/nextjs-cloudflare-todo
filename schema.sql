-- テーブルの存在を確認
DROP TABLE IF EXISTS todos;

-- テーブルの作成
CREATE TABLE todos (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

-- テストデータ挿入
INSERT INTO todos (title, content) VALUES
  ('タスク1', 'タスク1です'),
  ('タスク2', 'タスク2です'),
  ('タスク3', 'タスク3です');