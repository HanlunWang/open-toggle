// 方案 B · Focus Tiles —— 信息层级重构
// 核心洞察：用户 90% 的时间只关心"现在什么在跑"。
// 运行中的开关升格为大磁贴（倒计时、参数摘要一眼可见，旋钮就在贴上）；
// 闲置开关折叠成极简两列网格。参数展开成面板内的下沉抽屉。

function OptBTile({ sw, on, flip, count, sub }) {
  const { Icon } = sw;
  return (
    <div className={"ot-tile" + (on ? " live" : "")} onClick={() => flip(sw.id)}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Icon />
        <div className={"ot-toggle " + (on ? "on" : "off")} style={{ width: 34, height: 19 }}>
          <div className="knob" style={{ width: 13, height: 13, left: on ? 17 : 2 }} />
        </div>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 14 }}>{sw.name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 3 }}>
        {on && count
          ? <span className="ot-count" style={{ fontSize: 15, color: "var(--ot-txt)", textShadow: "0 0 12px rgba(255,255,255,.35)" }}>{count}</span>
          : <span style={{ fontSize: 10.5, color: "var(--ot-txt-3)" }}>{on ? "运行中" : "已停止"}</span>}
      </div>
      {sub && <div style={{ fontSize: 10, color: "var(--ot-txt-3)", marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

function OptBIdleCell({ sw, on, flip }) {
  const { Icon } = sw;
  return (
    <div onClick={() => flip(sw.id)}
         style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 10,
                  border: "1px solid transparent", cursor: "pointer", transition: "all .15s" }}
         onMouseEnter={e => e.currentTarget.style.borderColor = "var(--ot-line)"}
         onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
      <span className="ot-st">{on ? <span className="dot-on" /> : <span className="dot-off" />}</span>
      <Icon />
      <span style={{ fontSize: 11.5, color: on ? "var(--ot-txt)" : "var(--ot-txt-2)",
                     overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sw.name}</span>
    </div>
  );
}

function OptBPanel() {
  const [st, flip] = useToggles();
  const p = OT_MOYU_PARAMS;
  const live = OT_SWITCHES.filter(s => st[s.id]);
  const idle = OT_SWITCHES.filter(s => !st[s.id]);
  return (
    <div className="ot-surface" style={{ width: 330, borderRadius: 24, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 17px 9px" }}>
        <GPrompt />
        <span style={{ fontSize: 13, fontWeight: 600 }}>OpenToggle</span>
        <span style={{ flex: 1 }} />
        <span className="ot-ghost" style={{ padding: "3px 7px" }}><GSliders /></span>
      </div>

      {/* 运行区：磁贴 */}
      <div style={{ padding: "4px 13px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
        {live.slice(0, 4).map(sw => (
          <OptBTile key={sw.id} sw={sw} on={true} flip={flip} count={sw.count}
                    sub={sw.id === "moyu" ? "F15 · 每 4 分钟" : null} />
        ))}
      </div>

      {/* 摸鱼模式参数抽屉（点磁贴展开的下沉区） */}
      <div style={{ margin: "0 13px 12px", borderRadius: 14, border: "1px solid var(--ot-line)",
                    background: "rgba(0,0,0,.30)", padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <GFish />
          <span style={{ fontSize: 11.5, fontWeight: 600 }}>摸鱼模式 · 参数</span>
          <span style={{ flex: 1 }} />
          <GChevron open={true} />
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 7 }}>
          {p.awakeOptions.map((o, i) => (
            <span key={o} className={"ot-chip" + (i === p.awakeSel ? " sel" : "")} style={{ fontSize: 10.5 }}>{o}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
          <span className="ot-field" style={{ fontSize: 10.5 }}><GKey /> {p.nudgeKey}</span>
          {p.durationPresets.map((o, i) => (
            <span key={o} className={"ot-chip" + (i === p.durationSel ? " sel" : "")} style={{ fontSize: 10.5 }}>{o}</span>
          ))}
        </div>
      </div>

      {/* 闲置区 */}
      <div style={{ padding: "0 13px 4px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--ot-txt-3)" }}>IDLE</span>
        <hr className="ot-hr" style={{ flex: 1 }} />
      </div>
      <div style={{ padding: "2px 8px 10px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {idle.map(sw => <OptBIdleCell key={sw.id} sw={sw} on={false} flip={flip} />)}
      </div>
    </div>
  );
}

// 管理器缩略：画廊卡片（每个开关一张玻璃卡，选中的展开成编辑视图）
function OptBManager() {
  const cards = [
    ["摸鱼模式", GFish, true], ["Keep Awake", GCup, false],
    ["Dark Mode", GMoon, true], ["Local HTTP Server", GGlobe, false],
  ];
  return (
    <div className="ot-surface" style={{ width: 640, borderRadius: 18, overflow: "hidden", fontSize: 11 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderBottom: "1px solid var(--ot-line)" }}>
        <span style={{ display: "flex", gap: 5 }}>
          {[0,1,2].map(i => <i key={i} style={{ width: 10, height: 10, borderRadius: 5, border: "1px solid var(--ot-line-strong)" }} />)}
        </span>
        <span style={{ flex: 1, textAlign: "center", color: "var(--ot-txt-2)" }}>脚本管理 — OpenToggle</span>
      </div>
      <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {cards.map(([n, Icon, on], i) => (
          <div key={n} className={"ot-tile" + (i === 0 ? " live" : "")} style={{ padding: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Icon />
              <span className="ot-st">{on ? <span className="dot-on" /> : <span className="dot-off" />}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 10 }}>{n}</div>
            <div style={{ fontSize: 9.5, color: "var(--ot-txt-3)", marginTop: 2 }}>{i % 2 === 0 ? "daemon" : "toggle"}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: "0 14px 14px", borderRadius: 12, border: "1px solid var(--ot-line)", padding: 12,
                    background: "rgba(0,0,0,.25)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center" }}>
          <GFish /><span style={{ fontWeight: 600 }}>摸鱼模式</span>
          <span style={{ flex: 1 }} />
          <span className="ot-chip">编辑脚本</span><span className="ot-chip sel">保存</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <span className="ot-chip">awake · select</span>
          <span className="ot-chip">nudgekey · key</span>
          <span className="ot-chip">interval · number</span>
          <span className="ot-chip">duration · number</span>
          <span className="ot-chip" style={{ borderStyle: "dashed" }}>＋ 参数</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OptBPanel, OptBManager });
