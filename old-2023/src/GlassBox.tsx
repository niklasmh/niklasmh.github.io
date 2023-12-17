import styled from 'styled-components'

const Glass = styled.div`
  position: relative;
  z-index: 1;

  --b: 2px;
  --px: 0;
  --py: 0;
  --r: 24px;
  --blur: 10px;
  clip-path: inset(-1px round var(--r));

  box-shadow: 0 0 100px 0 rgba(0, 0, 0, 0.4);
  background: linear-gradient(
      var(--glass-direction),
      #fff0,
      rgba(
        var(--glass-color),
        calc(var(--glass-color-alpha) * var(--glass-distance))
      )
    ),
    linear-gradient(
      calc(var(--glass-direction) + 180deg),
      #fff0,
      rgba(
        var(--glass-color2),
        calc(var(--glass-color-alpha) * var(--glass-distance))
      )
    ),
    rgba(
      var(--glass-color),
      calc(var(--glass-color-alpha) * (1 - var(--glass-distance)))
    );
  border-radius: var(--r);
  padding: calc(var(--b) + var(--py)) calc(var(--b) + var(--px));
  box-sizing: border-box;

  :before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    top: -1px;
    left: -1px;
    bottom: -1px;
    padding: calc(var(--b) + 0px);
    border-radius: calc(var(--r) + 0px);
    pointer-events: none;

    --glow: rgba(
      var(--glass-color),
      calc(var(--glass-color-alpha) * var(--glass-distance))
    );
    --glow2: rgba(
      var(--glass-color2),
      calc(var(--glass-color-alpha) * var(--glass-distance))
    );
    --light: rgba(255, 255, 255, calc(var(--glass-distance) * 0.4));
    --light-weak: rgba(255, 255, 255, calc(var(--glass-distance) * 0.2));
    background: conic-gradient(
        from var(--glass-direction),
        var(--light) 0deg,
        #fff0 90deg,
        #fff0 270deg,
        var(--light) 360deg
      ),
      conic-gradient(
        from var(--glass-direction),
        var(--glow) 0deg,
        #fff0 90deg,
        #fff0 270deg,
        var(--glow) 360deg
      ),
      conic-gradient(
        from calc(var(--glass-direction) + 180deg),
        var(--glow2) 0deg,
        #fff0 90deg,
        #fff0 270deg,
        var(--glow2) 360deg
      ),
      rgba(255, 255, 255, calc(0.2 * (1 - var(--glass-distance))));

    --fill: linear-gradient(red, red);
    mask: var(--fill) content-box exclude, var(--fill);
    -webkit-mask-composite: xor;
    -webkit-mask: var(--fill) content-box, var(--fill);

    backdrop-filter: blur(calc(var(--blur) * 1)) saturate(2);
  }

  :after {
    content: '';
    position: absolute;
    z-index: -1;
    inset: var(--b);
    border-radius: calc(var(--r) - 1px);
    backdrop-filter: blur(var(--blur));
  }
`

const GlassBox = styled(Glass)`
  max-width: calc(100% - 32px);
  width: 720px;
  margin: 32px 16px 64px;
  display: inline-block;
  color: #fff9;
  font-weight: 400;
  letter-spacing: 4px;
  --glass-color: 255, 0, 255;
  //--glass-color: 100, 255, 100;
  --glass-color2: 0, 100, 255;
  --glass-color-alpha: 0.2;
  --rotate: 0deg;
  //--glass-direction: calc(315deg - var(--rotate));
  transform: rotate(var(--rotate));

  & > :first-child {
    margin-left: 24px;
    margin-right: 24px;
  }
`

export default GlassBox
