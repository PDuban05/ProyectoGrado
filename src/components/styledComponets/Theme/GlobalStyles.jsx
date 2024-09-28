import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root{
	font-size: 16px;
}

  /* Reset de estilos para todos los componentes de HTML */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  /* Configuración de fuentes */
  body {
    line-height: 1.5;
    font-family: 'Poppins', sans-serif;
    background:${(props) => props.theme.backgroundBody};
   margin: 0 ;
   padding: 0;
   transition: all .5s cubic-bezier(0.1, 0.7, 0.6, 0.9);
 
  }

  /* ::-webkit-scrollbar {
  background-color: #fff;
  border-radius: 5px;
}


::-webkit-scrollbar-thumb {
  background-color:${(props) => props.theme.accent};
  border-radius: 5px;
}
  */

  /* Configuración de enlaces */
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  /* Configuración de listas */
  ul {
    list-style: none;
  }

  /* Configuración de imágenes */
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Otras configuraciones */
  button {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    
  }

  input {
    border: none;
    outline: none;
  }


  input:-webkit-autofill,
input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
}
input[data-autocompleted] {
    background-color: transparent !important;
}

:root {
  --slide-ease: cubic-bezier(.4,-0.3,.6,1.3);
	--easing: var(--slide-ease);
	--speed: 0.35s;
	--width: clamp(50px, 15vmin, 100px);
	--ar: 8 / 3;
	--ray: hsl(0 0% 100% / 0.5);
	--sun: hsl(47, 91%, 58%);
	--moon: hsl(212, 13%, 82%);
	--crater: hsl(221, 16%, 68%);
	--bg: hsl(219, 30%, 88%);
}



.clouds path:first-of-type {
	fill: var(--ray);
}

.toggle {
  /* random attempts at tackling the overflow iOS issue */
  z-index: 0;
  will-change: transform;
  isolation: isolate;
  transform: translate3d(0, 0, 0);
  /* End of workaround city   */
  -webkit-tap-highlight-color: transparent;
	width: var(--width);
	aspect-ratio: var(--ar);
	border-radius: 100vh;
	border: 0;
	position: relative;
	padding: 0;
	overflow: hidden;
	cursor: pointer;
	transition: background var(--speed) var(--easing);
	--sky: hsl(204, 53%, 47%);
	--night: hsl(229, 25%, 16%);
	outline-color: transparent;
	background: hsl(
		calc(204 + (var(--dark, 0) * 25))
		calc((53 - (var(--dark, 0) * 28)) * 1%)
		calc((47 - (var(--dark, 0) * 31)) * 1%)
	);
	box-shadow:
		calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 100% / 0.95),
		calc(var(--width) * 0) calc(var(--width) * -0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 10% / 0.2),
		calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.5) 0 hsl(210 10% 100% / 0.15);
}

.toggle:after {
	content: "";
	position: absolute;
	inset: 0;
	box-shadow:
		calc(var(--width) * 0) calc(var(--width) * -0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.15) inset,
		calc(var(--width) * 0) calc(var(--width) * 0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.65) inset;
	border-radius: 100vh;
}

.toggle__backdrop {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	transition: translate var(--speed) var(--easing);
	translate: 0 calc(
		var(--dark, 0) * (100% - (3 / 8 * var(--width)))
	);
  overflow: visible !important;
}

[aria-pressed=false] .toggle__backdrop:last-of-type {
	transition-timing-function: cubic-bezier(.2,-0.6,.7,1.6);
}
[aria-pressed=false] .stars path {
	transition-delay: 0s;
}

.stars path {
	transform-box: fill-box;
	transform-origin: 25% 50%;
	scale: calc(0.25 + (var(--dark, 0) * 0.75));
	transition: scale var(--speed) calc(var(--speed) * 0.5) var(--easing);
}

.toggle__indicator {
	height: 100%;
	aspect-ratio: 1;
	border-radius: 0%;
	display: grid;
	place-items: center;
	padding: 3%;
}

.toggle__star {
	height: 100%;
	aspect-ratio: 1;
	border-radius: 50%;
	position: relative;
	transition: translate var(--speed) var(--easing);
	translate: calc((var(--dark, 0) * -10%) + 5%) 0;
/* 	translate: calc((var(--dark, 0) * -18%) + 5%) 0; */
}

.sun {
	background: var(--sun);
	position: absolute;
	inset: 0;
	border-radius: 50%;
	overflow: hidden;
	box-shadow:
		calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 100% / 0.95) inset,
		calc(var(--width) * -0.01) calc(var(--width) * -0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 20% / 0.5) inset;
}
.moon {
	position: absolute;
	inset: -1%;
	border-radius: 50%;
	background: var(--moon);
	transition: translate var(--speed) ease-in-out;
	translate: calc((100 - (var(--dark, 0) * 100)) * 1%) 0%;
	box-shadow:
		calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 100% / 0.95) inset,
		calc(var(--width) * -0.01) calc(var(--width) * -0.01) calc(var(--width) * 0.02) 0 hsl(210 10% 10% / 0.95) inset;
}

.moon__crater {
	position: absolute;
	background: var(--crater);
	border-radius: 50%;
	width: calc(var(--size, 10) * 1%);
	aspect-ratio: 1;
	left: calc(var(--x) * 1%);
	top: calc(var(--y) * 1%);
	box-shadow:
		calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.01) 0 hsl(210 10% 6% / 0.25) inset,
		0 calc(var(--width) * 0.005) calc(var(--width) * 0.01) 0 hsl(210 10% 100% / 0.25);
}

.moon__crater:nth-of-type(1) {
	--size: 18;
	--x: 40;
	--y: 15;
}
.moon__crater:nth-of-type(2) {
	--size: 20;
	--x: 65;
	--y: 58;
}
.moon__crater:nth-of-type(3) {
	--size: 34;
	--x: 18;
	--y: 40;
}

.toggle__star:before {
	content: "";
	z-index: -1;
	width: 356%;
	background:
		radial-gradient(hsl(0 0% 100% / 0.25) 40%, transparent 40.5%),
		radial-gradient(hsl(0 0% 100% / 0.25) 56%, transparent 56.5%)
	  hsl(0 0% 100% / 0.25);
	border-radius: 50%;
	aspect-ratio: 1;
	position: absolute;
	top: 50%;
	left: 50%;
	transition: translate var(--speed) var(--easing);
	translate: calc(
		(50 - (var(--dark, 0) * 4)) *
		-1%
	)
	-50%;
}

.toggle__star:after {
	content: "";
	position: absolute;
	inset: 0;
	display: block;
	background: hsl(0 0% 0% / 0.5);
	filter: blur(4px);
	translate: 2% 4%;
	border-radius: 50%;
	z-index: -1;
}

.toggle__indicator-wrapper {
	position: absolute;
	inset: 0;
	transition: translate var(--speed) var(--slide-ease);
	translate: calc(
		var(--dark, 0) * (var(--width) - (3 / 8 * var(--width)))
	) 0;
}

[aria-pressed=true] {
	--dark: 1;
}














`;

export default GlobalStyles;
