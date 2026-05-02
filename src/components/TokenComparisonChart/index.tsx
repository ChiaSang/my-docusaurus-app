import {useEffect, useMemo, useState} from 'react';

const rows = [
  {name: 'GPT-4o', input: 1200, output: 420},
  {name: 'Claude 3.5 Sonnet', input: 980, output: 360},
  {name: 'Gemini 1.5 Pro', input: 860, output: 280},
  {name: 'DeepSeek-V3', input: 720, output: 240},
  {name: 'Qwen2.5', input: 640, output: 210},
];

export function TokenSummary() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((value) => (value + 1) % rows.length);
    }, 700);

    return () => window.clearInterval(timer);
  }, []);

  const current = rows[tick];

  return (
    <div style={{padding: '1rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 16, marginBottom: '1rem'}}>
      <strong>动态高亮：{current.name}</strong>
      <div style={{marginTop: '0.35rem'}}>
        这位模型当前展示的是 {current.input + current.output} tokens 的总消耗。
      </div>
    </div>
  );
}

export function AnimatedBars() {
  const [progress, setProgress] = useState(0);
  const maxValue = useMemo(
    () => Math.max(...rows.flatMap((row) => [row.input, row.output])),
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : value + 2));
    }, 20);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      {rows.map((row) => (
        <div key={row.name} style={{display: 'grid', gap: '0.35rem'}}>
          <strong>{row.name}</strong>
          <div style={{fontSize: '0.9rem'}}>输入 {row.input} tokens · 输出 {row.output} tokens</div>
          <div style={{display: 'grid', gap: '0.35rem'}}>
            <div style={{height: 12, borderRadius: 999, background: 'var(--ifm-color-emphasis-200)', overflow: 'hidden'}}>
              <div
                style={{
                  width: `${(row.input / maxValue) * progress}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #1677ff, #69c0ff)',
                  transition: 'width 120ms linear',
                }}
              />
            </div>
            <div style={{height: 12, borderRadius: 999, background: 'var(--ifm-color-emphasis-200)', overflow: 'hidden'}}>
              <div
                style={{
                  width: `${(row.output / maxValue) * progress}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #13c2c2, #87e8de)',
                  transition: 'width 120ms linear',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}