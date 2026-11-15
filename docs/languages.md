# Languages

The site ships in seven locales, picked from the languages most spoken at home
in California (ACS): English, Spanish, Chinese (Traditional and Simplified),
Tagalog, Vietnamese and Korean.

| Locale    | Catalog               | Notes                                         |
| --------- | --------------------- | --------------------------------------------- |
| `en`      | `src/i18n/en.ts`      | Source of truth. Approved copy.               |
| `es`      | `src/i18n/es.ts`      | Informal "tú", matching the plain voice.      |
| `zh-hant` | `src/i18n/zh-hant.ts` | Taiwan/Hong Kong vocabulary (應用程式, 帳號). |
| `zh-hans` | `src/i18n/zh-hans.ts` | Mainland vocabulary (应用, 账号, 外卖).       |
| `tl`      | `src/i18n/tl.ts`      | Everyday Taglish; app terms stay English.     |
| `vi`      | `src/i18n/vi.ts`      | Neutral "bạn".                                |
| `ko`      | `src/i18n/ko.ts`      | Polite 합니다/해요 register.                  |

## How they were made

Machine translated from `en.ts` with no human review, by decision of the
project owner. Every translated page says so in the footer and names English as
the official version.

## Rules every catalog follows

- Every key is translated (CI `check:i18n` fails on a partial live catalog).
- `{placeholders}` are kept exactly.
- Statute citations (`§ 22599.2(a)` and so on) are kept exactly.
- No em dashes, including the Chinese `——` (CI `check:emdash`).
- Company names (DoorDash, Uber Eats, Grubhub), FTC, ZIP and AB 578 stay as is.

## Key terms

| English               | es                 | zh-hant      | zh-hans    | tl               | vi                      | ko          |
| --------------------- | ------------------ | ------------ | ---------- | ---------------- | ----------------------- | ----------- |
| Attorney General (AG) | Fiscal General     | 州檢察長     | 州总检察长 | Attorney General | Tổng Chưởng lý          | 검찰총장    |
| complaint             | queja              | 投訴         | 投诉       | reklamo          | khiếu nại               | 민원        |
| full refund           | reembolso completo | 全額退款     | 全额退款   | buong refund     | hoàn tiền toàn bộ       | 전액 환불   |
| app credit            | crédito en la app  | 應用程式點數 | 应用内积分 | app credit       | tín dụng trong ứng dụng | 앱 크레딧   |
| wrong order           | pedido equivocado  | 送錯訂單     | 送错订单   | maling order     | đơn hàng sai            | 잘못된 주문 |
| floor (minimum owed)  | mínimo             | 底線         | 底线       | sahig            | mức sàn                 | 최저선      |
| kit                   | kit de queja       | 投訴資料     | 投诉材料   | kit              | bộ khiếu nại            | 키트        |

## Not yet translated

The outgoing complaint templates (`src/lib/complaint/templates/`) are English
only. The kit shows English as the text to send, since the AG's online form is
in English; the "send in my language" toggle only appears once a template
translation exists for that locale.
