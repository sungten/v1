import { useState, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "chevron"
  | "clock"
  | "elevator"
  | "escalator"
  | "heart"
  | "home"
  | "info"
  | "location"
  | "pin"
  | "refresh"
  | "route"
  | "search";

function Icon({
  name,
  size = 20,
  strokeWidth = 1.9,
  filled = false,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    elevator: (
      <>
        <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
        <path d="M12 7v10M8 10l-1.5 2L8 14M16 10l1.5 2-1.5 2" />
      </>
    ),
    escalator: (
      <>
        <path d="M4 17h4.2a2 2 0 0 0 1.4-.6l5.8-5.8a2 2 0 0 1 1.4-.6H20" />
        <path d="M4 20h4.8a4 4 0 0 0 2.8-1.2l5-5A3 3 0 0 1 18.8 13H20" />
        <circle cx="8" cy="6" r="2" />
        <path d="M8 8v4h3" />
      </>
    ),
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M18.2 16.5A8 8 0 1 1 20 12" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className ? `shrink-0 ${className}` : "shrink-0"}
      fill={filled ? "currentColor" : "none"}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {paths[name]}
    </svg>
  );
}

type FacilityCardProps = {
  available?: boolean;
  direction: string;
  exit: string;
  floor: string;
  id: string;
  location: string;
  selected: boolean;
  type: "elevator" | "escalator";
  onSelect: () => void;
};

function FacilityCard({
  available = true,
  direction,
  exit,
  floor,
  id,
  location,
  selected,
  type,
  onSelect,
}: FacilityCardProps) {
  const isElevator = type === "elevator";

  return (
    <button
      className={`facility-card group w-full overflow-hidden rounded-[22px] border bg-white text-left transition ${
        selected
          ? "border-[#187251] shadow-[0_12px_32px_rgba(20,84,61,0.12)]"
          : "border-[#e7e8e3] hover:border-[#bccbc3]"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="flex items-start gap-3.5 p-4 pb-3">
        <div
          className={`grid size-11 shrink-0 place-items-center rounded-[14px] ${
            isElevator ? "bg-[#e5f4ed] text-[#176848]" : "bg-[#eef0f8] text-[#485172]"
          }`}
        >
          <Icon name={isElevator ? "elevator" : "escalator"} size={23} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[15px] font-extrabold tracking-[-0.03em] text-[#16231e]">
              {isElevator ? "엘리베이터" : "에스컬레이터"} {id}
            </p>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                available ? "bg-[#dcf6e9] text-[#126642]" : "bg-[#fff0e9] text-[#a5482e]"
              }`}
            >
              <span className={`size-1.5 rounded-full ${available ? "bg-[#1d8a5e]" : "bg-[#d55d3f]"}`} />
              {available ? "정상 가동" : "운행 중지"}
            </span>
          </div>
          <p className="mt-1 text-[13px] font-medium text-[#717a75]">{location}</p>
        </div>
      </div>

      <div className="mx-4 grid grid-cols-[1fr_auto_1fr] items-center rounded-2xl bg-[#f5f6f2] px-3 py-3">
        <div>
          <p className="text-[10px] font-bold text-[#8a918d]">출발</p>
          <p className="mt-0.5 text-[14px] font-extrabold text-[#25312c]">{floor.split(" ↔ ")[0]}</p>
        </div>
        <div className="mx-3 flex items-center gap-1 text-[#919994]">
          <span className="h-px w-4 bg-[#c8ceca]" />
          <Icon name="arrow" size={16} />
          <span className="h-px w-4 bg-[#c8ceca]" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[#8a918d]">도착</p>
          <p className="mt-0.5 text-[14px] font-extrabold text-[#25312c]">{floor.split(" ↔ ")[1]}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-3.5">
        <div>
          <p className="text-[13px] font-bold text-[#28342f]">{exit}</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#87908b]">{direction}</p>
        </div>
        <span className="text-[#8c9690] transition group-hover:translate-x-0.5 group-hover:text-[#187251]">
          <Icon name="chevron" size={18} />
        </span>
      </div>
    </button>
  );
}

export default function App() {
  const [mode, setMode] = useState("계단 없이 이동");
  const [selectedFacility, setSelectedFacility] = useState("2호기");
  const [favorite, setFavorite] = useState(false);
  const [query, setQuery] = useState("잠실역");
  const [lastChecked, setLastChecked] = useState("18:05");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setLastChecked(
        new Intl.DateTimeFormat("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
      setRefreshing(false);
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#eef1ec] text-[#16231e]">
      <div className="mx-auto min-h-screen w-full max-w-[520px] bg-[#fafbf8] shadow-[0_0_60px_rgba(42,65,53,0.08)]">
        <header className="sticky top-0 z-30 border-b border-[#eceee9]/90 bg-[#fafbf8]/95 px-5 pb-3 pt-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <a className="flex items-center gap-2" href="#top" aria-label="올라가는 길 홈">
              <span className="grid size-8 place-items-center rounded-[11px] bg-[#183c2e] text-white">
                <Icon name="arrow" size={18} strokeWidth={2.4} />
              </span>
              <span className="text-[17px] font-black tracking-[-0.045em]">올라가는 길</span>
            </a>
            <button
              aria-label={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              className="grid size-9 place-items-center rounded-full border border-[#e0e4df] bg-white text-[#65716b] transition"
              onClick={() => setFavorite(!favorite)}
              type="button"
            >
              <Icon
                className={favorite ? "text-[#e11d48]" : undefined}
                filled={favorite}
                name="heart"
                size={18}
              />
            </button>
          </div>
          <label className="flex h-12 items-center gap-3 rounded-2xl border border-[#dfe4de] bg-white px-4 shadow-[0_3px_12px_rgba(25,54,42,0.04)] focus-within:border-[#31795e]">
            <Icon name="search" size={19} />
            <input
              aria-label="역 또는 출구 검색"
              className="min-w-0 flex-1 bg-transparent text-[14px] font-bold outline-none placeholder:font-medium placeholder:text-[#9da49f]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="역 이름 또는 출구를 검색하세요"
              value={query}
            />
            {query && (
              <button
                className="grid size-5 place-items-center rounded-full bg-[#e7e9e5] text-[12px] font-bold text-[#65706a]"
                onClick={() => setQuery("")}
                type="button"
                aria-label="검색어 지우기"
              >
                ×
              </button>
            )}
          </label>
        </header>

        <main id="top" className="pb-28">
          <section className="px-5 pb-5 pt-6">
            <button className="mb-4 flex items-center gap-1.5 text-[12px] font-bold text-[#557066]" type="button">
              <Icon name="location" size={15} />
              현재 위치에서 1.2km
              <Icon name="chevron" size={13} />
            </button>

            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[29px] font-black leading-none tracking-[-0.055em]">잠실역</h1>
                  <span className="grid size-7 place-items-center rounded-full bg-[#28a745] text-[12px] font-black text-white">
                    2
                  </span>
                  <span className="grid size-7 place-items-center rounded-full bg-[#8b5a9f] text-[12px] font-black text-white">
                    8
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-medium text-[#758079]">경로 검증 완료 · 시설 12개</p>
              </div>
              <button
                className="flex h-9 items-center gap-1.5 rounded-full border border-[#dce2dc] bg-white px-3 text-[12px] font-bold text-[#405149] disabled:opacity-60"
                disabled={refreshing}
                onClick={refresh}
                type="button"
              >
                <span className={refreshing ? "animate-spin" : ""}>
                  <Icon name="refresh" size={14} />
                </span>
                {refreshing ? "확인 중" : "새로고침"}
              </button>
            </div>
          </section>

          <section className="border-y border-[#e9ece7] bg-white px-5 py-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[14px] font-extrabold tracking-[-0.025em]">어떻게 이동하시나요?</h2>
              <button className="text-[11px] font-bold text-[#68766f] underline underline-offset-2" type="button">
                조건 안내
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#eff1ed] p-1.5">
              {["계단 없이 이동", "엘리베이터만", "에스컬레이터 포함"].map((option) => (
                <button
                  className={`min-h-14 rounded-xl px-2 text-[11px] font-extrabold leading-[1.35] transition ${
                    mode === option
                      ? "bg-[#193d2f] text-white shadow-[0_4px_12px_rgba(25,61,47,0.18)]"
                      : "text-[#68736d] hover:bg-white/60"
                  }`}
                  key={option}
                  onClick={() => setMode(option)}
                  type="button"
                >
                  {option === "계단 없이 이동" && <span className="mb-1 block text-[9px] font-bold text-[#a9dbc7]">추천</span>}
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="px-5 py-6">
            <div className="rounded-[22px] bg-[#193d2f] p-4 text-white shadow-[0_12px_30px_rgba(25,61,47,0.16)]">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-white/10 text-[#c2e7d8]">
                  <Icon name="route" size={21} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-[#a9c8bb]">추천 경로</p>
                      <h2 className="mt-0.5 text-[16px] font-extrabold tracking-[-0.03em]">4번 출구 방면 · 지상 이동</h2>
                    </div>
                    <Icon name="chevron" size={18} />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold">엘리베이터 2회</span>
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold">약 6분</span>
                    <span className="rounded-md bg-[#296c51] px-2 py-1 text-[10px] font-bold text-[#d7f7ea]">모두 정상</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#cfdfd8]">
                  <span>2호선 승강장</span>
                  <Icon name="arrow" size={13} />
                  <span>B1 대합실</span>
                  <Icon name="arrow" size={13} />
                  <span>지상</span>
                </div>
              </div>
            </div>
          </section>

          <section className="px-5" id="facilities">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-extrabold text-[#1e7555]">4번 출구 방면</p>
                <h2 className="mt-1 text-[19px] font-black tracking-[-0.04em]">이용 가능한 시설</h2>
              </div>
              <p className="text-[11px] font-semibold text-[#7d8882]">엘리베이터 3개</p>
            </div>

            <div className="space-y-3">
              <FacilityCard
                direction="4번 출구 방면 · 직접 연결 아님"
                exit="대합실에서 다른 엘리베이터로 환승"
                floor="B2 승강장 ↔ B1 대합실"
                id="2호기"
                location="2호선 내선 승강장 동쪽 끝"
                onSelect={() => setSelectedFacility("2호기")}
                selected={selectedFacility === "2호기"}
                type="elevator"
              />
              <FacilityCard
                direction="4번 출구로 직접 연결"
                exit="B1 대합실에서 지상까지 이동"
                floor="B1 대합실 ↔ 지상"
                id="7호기"
                location="4번 출구 개찰구 오른쪽"
                onSelect={() => setSelectedFacility("7호기")}
                selected={selectedFacility === "7호기"}
                type="elevator"
              />
              {mode === "에스컬레이터 포함" && (
                <FacilityCard
                  direction="상행 전용 · 계단 없는 경로 아님"
                  exit="3·4번 출구 방면"
                  floor="B2 승강장 ↔ B1 대합실"
                  id="5호기"
                  location="2호선 외선 승강장 중앙"
                  onSelect={() => setSelectedFacility("5호기")}
                  selected={selectedFacility === "5호기"}
                  type="escalator"
                />
              )}
            </div>
          </section>

          <section className="mx-5 mt-6 rounded-[20px] border border-[#e5e1d6] bg-[#fffdf7] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[#88744b]">
                <Icon name="info" size={19} />
              </span>
              <div>
                <h3 className="text-[13px] font-extrabold text-[#403b31]">상태 정보는 이렇게 확인했어요</h3>
                <p className="mt-1.5 text-[11px] font-medium leading-[1.65] text-[#777064]">
                  서울교통공사 편의시설 위치정보를 기준으로 표시합니다. 이동 중 상태가 바뀔 수 있으니 시설 이용
                  직전에 다시 확인해 주세요.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#5f5a50]">
                  <Icon name="clock" size={14} />
                  오늘 {lastChecked} 마지막 확인
                  <span className="mx-1 text-[#c3bba9]">·</span>
                  <button className="text-[#196649] underline underline-offset-2" onClick={refresh} type="button">
                    다시 확인
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="px-5 pb-2 pt-7">
            <button
              className="flex w-full items-center justify-between rounded-[18px] border border-[#e3e7e2] bg-white px-4 py-4 text-left"
              type="button"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#f0f2ef] text-[#56635d]">
                  <Icon name="pin" size={18} />
                </span>
                <span>
                  <strong className="block text-[13px] font-extrabold">다른 출구 보기</strong>
                  <span className="mt-0.5 block text-[11px] font-medium text-[#87908b]">1번부터 11번 출구까지</span>
                </span>
              </span>
              <Icon name="chevron" size={18} />
            </button>
          </section>
        </main>

        <nav
          aria-label="주요 메뉴"
          className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[520px] -translate-x-1/2 grid-cols-3 border-t border-[#e5e8e3] bg-[#fafbf8]/95 px-6 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
        >
          {[
            { icon: "home" as const, label: "역 찾기", active: true },
            { icon: "route" as const, label: "내 경로", active: false },
            { icon: "heart" as const, label: "즐겨찾기", active: false },
          ].map((item) => (
            <button
              className={`flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-extrabold ${
                item.active ? "text-[#176747]" : "text-[#8b948f]"
              }`}
              key={item.label}
              type="button"
            >
              <Icon name={item.icon} size={20} strokeWidth={item.active ? 2.3 : 1.8} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
