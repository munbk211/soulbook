# 소울북 디자인 가이드라인 (Design Guidelines)

> 소울북의 모든 UI는 이 가이드를 기준으로 설계합니다.  
> 차갑고 기계적인 느낌보다, 낡은 책방 한켠에 앉아있는 듯한 따뜻함을 목표로 합니다.

---

## 무드 (Mood)

| 키워드 | 설명 |
|--------|------|
| 따뜻함 | 사용자가 긴장하지 않고 편안하게 머물 수 있는 온기 |
| 아날로그 | 디지털임에도 손으로 만든 듯한 감성 |
| 종이 질감 | 크림빛 배경, 부드러운 그림자, 자연스러운 여백 |
| 편안한 책방 | 정돈되어 있지만 딱딱하지 않은, 오래된 동네 책방의 분위기 |

---

## 컬러 시스템 (Color System)

| 역할 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 배경색 | Cream | `#FDFBF7` | 종이 질감을 닮은 따뜻한 흰색 |
| 포인트 | Deep Green | `#2D4A3E` | 차분하고 신뢰감 있는 깊은 녹색 |
| 포인트 (연한) | Soft Green | `#4A7C59` | 버튼 hover, 보조 강조 |
| 텍스트 (기본) | Ink | `#1C1C1C` | 잉크처럼 부드러운 검정 |
| 텍스트 (보조) | Stone | `#6B6B6B` | 설명, 캡션 등 보조 텍스트 |
| 경계선 | Linen | `#E8E2D9` | 카드·구분선의 자연스러운 선 |
| 카드 배경 | Paper | `#FFFFFF` | 콘텐츠 카드의 흰 종이 느낌 |

---

## 타이포그래피 (Typography)

| 용도 | 스타일 | 권장 폰트 |
|------|--------|-----------|
| 제목 (H1~H2) | Serif | `Noto Serif KR`, `Playfair Display` |
| 소제목 (H3~H4) | Serif 또는 Semi-bold Sans | `Noto Serif KR` |
| 본문 | Sans-serif | `Noto Sans KR`, `Inter` |
| 캡션·레이블 | Sans-serif Light | `Noto Sans KR` |

### 원칙
- 제목은 세리프 폰트로 감성적인 무게감을 살립니다.
- 본문은 산세리프로 가독성을 높여 편안한 독서 경험을 제공합니다.
- 줄간격(line-height)은 여유 있게 `1.7~1.8` 을 기본으로 합니다.

---

## 컴포넌트 스타일 (Component Style)

### 카드 (Card)
```
배경: #FFFFFF (Paper)
테두리: 없음 또는 1px solid #E8E2D9 (Linen)
모서리: border-radius: 16px (부드럽게)
그림자: box-shadow: 0 2px 12px rgba(0,0,0,0.06) (가볍고 자연스럽게)
패딩: 충분한 내부 여백으로 숨 쉬는 레이아웃
```

### 버튼 (Button)
```
기본: 배경 Deep Green (#2D4A3E), 텍스트 흰색, border-radius: 12px
hover: Soft Green (#4A7C59) 으로 부드럽게 전환
보조 버튼: 배경 투명, 테두리 Deep Green, 텍스트 Deep Green
금지: 너무 각진 모서리, 형광색, 강한 그라디언트 — 기계적인 느낌 지양
```

### 입력 필드 (Input)
```
배경: #FDFBF7 (Cream) 또는 흰색
테두리: 1px solid #E8E2D9, focus 시 Deep Green
모서리: border-radius: 10px
```

---

## 여백 원칙 (Spacing)

- 콘텐츠 간 여백은 넉넉하게 — 빽빽한 레이아웃은 책방의 무드와 맞지 않습니다.
- 모바일 기준 좌우 패딩 `16px`, 섹션 간 간격 `40px` 이상 권장.

---

## globals.css 세팅 준비

```css
/* globals.css 에 반영할 기본 변수 */
:root {
  --color-bg: #FDFBF7;
  --color-point: #2D4A3E;
  --color-point-soft: #4A7C59;
  --color-ink: #1C1C1C;
  --color-stone: #6B6B6B;
  --color-linen: #E8E2D9;
  --color-paper: #FFFFFF;

  --font-serif: 'Noto Serif KR', 'Playfair Display', serif;
  --font-sans: 'Noto Sans KR', 'Inter', sans-serif;

  --radius-card: 16px;
  --radius-button: 12px;
  --radius-input: 10px;

  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.06);
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
  line-height: 1.75;
}
```

---

## tailwind.config.ts 세팅 준비

```ts
// tailwind.config.ts 에 반영할 커스텀 설정
theme: {
  extend: {
    colors: {
      cream: '#FDFBF7',
      'deep-green': '#2D4A3E',
      'soft-green': '#4A7C59',
      ink: '#1C1C1C',
      stone: '#6B6B6B',
      linen: '#E8E2D9',
      paper: '#FFFFFF',
    },
    fontFamily: {
      serif: ['Noto Serif KR', 'Playfair Display', 'serif'],
      sans: ['Noto Sans KR', 'Inter', 'sans-serif'],
    },
    borderRadius: {
      card: '16px',
      button: '12px',
      input: '10px',
    },
    boxShadow: {
      card: '0 2px 12px rgba(0, 0, 0, 0.06)',
    },
  },
},
```

---

*이 가이드는 소울북의 감성을 지키는 기준입니다. 새로운 컴포넌트를 추가할 때마다 이 문서와의 일관성을 먼저 확인해 주세요.*
