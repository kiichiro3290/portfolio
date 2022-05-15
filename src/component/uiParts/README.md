# UiParts
デザインシステムのUIライブラリに載せるべき汎用的なコンポーネントを管理する

### ファイル構成
```
uiParts/[ComponentName]
|--- index.tsx          Container層(Logic層とPresenter層の合体)
|--- presenter.tsx      Presenter層(見た目・DOM構造の管理)
|--- hooks.ts           Logic層(カスタムフックス)
|--- index.stories.tsx  Storybook
```