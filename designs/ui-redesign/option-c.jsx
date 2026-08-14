// 方案 C · Terminal Glass —— TUI 实验
// 面板即终端：全 monospace、点线引导、方块光标、开关是 [■]/[ ] 块。
// 与图标的 ">_" 血缘最直接，最贴"程序员的开关中心"身份；
// 键盘操作天然可映射（j/k 移动、space 拨开关、enter 展开）。

function OptCRow({ sw, on, flip, active, count }) {
  const nameWidth = 19; // 等宽对齐
  const pad = ".".repeat(Math.max(2, nameWidth - sw.name.length * (/[一-鿿]/.test(sw.name) ? 2 : 1)));
  return (
    <div onClick={() => flip(sw.id)}
         style={{ display: "flex", alignItems: "center", gap: 0, padding: "1.5px 16px",
                  cursor: "pointer", background: active ? "rgba(255,255,255,.06)" : "none",
                  borderLeft: active ? "2px solid rgba(255,255,255,.7)" : "2px solid transparent" }}>
      <span className={on ? "hot" : "dim"} style={{ width: 16 }}>{active ? "❯" : " "}</span>
      <span className={on ? "" : "mid"}>{sw.name}</span>
      <span className="dim" style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", margin: "0 6px", opacity: .45 }}>
        {"·".repeat(30)}
      </span>
      {on && count && <span className="mid" style={{ marginRight: 8 }}>{count}</span>}
      <span className={on ? "hot" : "dim"}>[</span>
      <span className={on ? "blk-on" : "blk-off"} style={{ margin: "0 3px" }} />
      <span className={on ? "hot" : "dim"}>]</span>
    </div>
  );
}

function OptCPanel() {
  const [st, flip] = useToggles();
  const p = OT_MOYU_PARAMS;
  const onCount = Object.values(st).filter(Boolean).length;
  return (
    <div className="ot-surface ot-term" style={{ width: 330, borderRadius: 20, overflow: "hidden" }}>
      {/* 标题行 */}
      <div style={{ padding: "11px 16px 7px", display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="hot" style={{ fontWeight: 700 }}>opentoggle</span>
        <span className="dim">v0.4.0</span>
        <span style={{ flex: 1 }} />
        <span className="mid">{onCount}<span className="dim">/{OT_SWITCHES.length} on</span></span>
      </div>
      <div className="dim" style={{ padding: "0 16px", fontSize: 10, letterSpacing: 0 }}>
        {"─".repeat(46)}
      </div>

      {/* 开关行 */}
      <div style={{ padding: "6px 0" }}>
        {OT_SWITCHES.map((sw, i) => (
          <OptCRow key={sw.id} sw={sw} on={st[sw.id]} flip={flip} active={i === 0} count={sw.count} />
        ))}
      </div>

      {/* 摸鱼模式参数（flag 风格） */}
      <div style={{ margin: "4px 16px 10px", padding: "8px 12px", borderRadius: 10,
                    border: "1px solid var(--ot-line)", background: "rgba(0,0,0,.34)" }}>
        <div><span className="dim">❯ </span><span className="hot">摸鱼模式</span><span className="dim"> --config</span></div>
        <div style={{ marginTop: 2 }}>
          <span className="dim">  awake    </span>
          {p.awakeOptions.map((o, i) => (
            <span key={o} className={i === p.awakeSel ? "hot" : "dim"} style={{ marginRight: 7 }}>
              {i === p.awakeSel ? `[${o}]` : o}
            </span>
          ))}
        </div>
        <div>
          <span className="dim">  key      </span><span className="mid">⌨ F15</span>
          <span className="dim">   interval </span><span className="mid">240s</span>
        </div>
        <div>
          <span className="dim">  duration </span>
          {p.durationPresets.map((o, i) => (
            <span key={o} className={i === p.durationSel ? "hot" : "dim"} style={{ marginRight: 6 }}>
              {i === p.durationSel ? `[${o}]` : o}
            </span>
          ))}
        </div>
      </div>

      {/* 提示符底栏 */}
      <div className="dim" style={{ padding: "0 16px", fontSize: 10 }}>{"─".repeat(46)}</div>
      <div style={{ padding: "6px 16px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <span className="hot">❯</span>
        <span className="ot-cursor" />
        <span style={{ flex: 1 }} />
        <span className="dim" style={{ fontSize: 10 }}>space 切换 · ⏎ 参数 · m 管理</span>
      </div>
    </div>
  );
}

// 管理器缩略：tmux 式分屏 —— 左列表 / 右上契约头 / 右下脚本体
function OptCManager() {
  const rows = [
    ["摸鱼模式", true], ["keep-awake", false], ["dark-mode", true],
    ["mute-audio", false], ["dock-autohide", true], ["http-server", false],
  ];
  return (
    <div className="ot-surface ot-term" style={{ width: 640, borderRadius: 16, overflow: "hidden", fontSize: 10.5 }}>
      <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--ot-line)", display: "flex", gap: 10 }}>
        <span className="hot">opentoggle · manager</span>
        <span style={{ flex: 1 }} />
        <span className="dim">[0] switches  [1] editor  [2] doctor</span>
      </div>
      <div style={{ display: "flex", minHeight: 280 }}>
        <div style={{ width: 168, borderRight: "1px solid var(--ot-line)", padding: "8px 0", background: "rgba(0,0,0,.22)" }}>
          {rows.map(([n, on], i) => (
            <div key={n} style={{ padding: "2.5px 12px", display: "flex", gap: 7, alignItems: "center",
                                  background: i === 0 ? "rgba(255,255,255,.07)" : "none" }}>
              <span className={on ? "blk-on" : "blk-off"} style={{ width: 6, height: 9 }} />
              <span className={i === 0 ? "hot" : "mid"}>{n}</span>
            </div>
          ))}
          <div className="dim" style={{ padding: "8px 12px 0" }}>+ new</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "9px 13px", borderBottom: "1px solid var(--ot-line)" }}>
            <div className="dim"># &lt;switch.name&gt; <span className="mid">摸鱼模式</span></div>
            <div className="dim"># &lt;switch.type&gt; <span className="mid">daemon</span></div>
            <div className="dim"># &lt;switch.param&gt; <span className="mid">key=awake type=select …</span></div>
            <div className="dim"># &lt;switch.menubar&gt; <span className="mid">mode=add countdown=on</span></div>
          </div>
          <div style={{ padding: "9px 13px", flex: 1, background: "rgba(0,0,0,.32)" }}>
            <div className="mid">ARGS="-${'{'}SWITCH_AWAKE:-d{'}'}"</div>
            <div className="mid">if [ "${'{'}SWITCH_DURATION:-0{'}'}" -gt 0 ]; then</div>
            <div className="mid">  ARGS="$ARGS -t $((SWITCH_DURATION * 60))"</div>
            <div className="mid">fi</div>
            <div><span className="hot">exec</span><span className="mid"> caffeinate $ARGS</span><span className="ot-cursor" style={{ marginLeft: 6, height: 11 }} /></div>
          </div>
          <div style={{ padding: "6px 13px", borderTop: "1px solid var(--ot-line)", display: "flex", gap: 12 }}>
            <span className="dim">:w 保存并热重启</span>
            <span className="dim">:validate ✓ no issues</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OptCPanel, OptCManager });
