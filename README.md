# Calculadora de Magnitudes Físicas

> Herramienta web para el cálculo de magnitudes físicas fundamentales  
> Programa: Ingeniería de Software

---

##  Datos del Estudiante

| Campo       | Detalle               |
|-------------|-----------------------|
| **Nombre**  | Samuel David Rodriguez Rodriguez   |
| **Materia** | Construcción de Algoritmos |
| **Programa**| Ingeniería de Software |

---

## Descripción del Proyecto

Calculadora web interactiva que implementa **10 operaciones físicas fundamentales** usando HTML, CSS y JavaScript puros (sin librerías externas).

Cada operación cuenta con:
- Campos de entrada etiquetados con unidades de medida
- Validaciones: campos vacíos, división por cero, valores inválidos
- Resultado animado con unidades correctas
- Soporte para tecla **Enter**

### Fórmulas implementadas

| # | Magnitud                    | Fórmula              | Unidad |
|---|-----------------------------|----------------------|--------|
| 1 | Velocidad                   | v = d / t            | m/s    |
| 2 | Aceleración                 | a = Δv / Δt          | m/s²   |
| 3 | Fuerza (2ª Ley de Newton)   | F = m · a            | N      |
| 4 | Trabajo                     | W = F · d · cos(θ)   | J      |
| 5 | Energía Cinética            | K = ½ · m · v²       | J      |
| 6 | Energía Potencial Grav.     | U = m · g · h        | J      |
| 7 | Densidad                    | ρ = m / V            | kg/m³  |
| 8 | Presión                     | P = F / A            | Pa     |
| 9 | Carga Eléctrica             | q = I · t            | C      |
|10 | Ley de Ohm                  | V = I · R            | V      |

---

##  Estructura del Proyecto

```
calculadora-fisica-samuel-rodriguez/
├── index.html   ← Estructura y secciones de la interfaz
├── style.css    ← Diseño visual (estética industrial-editorial)
├── script.js    ← Lógica de cálculo y validaciones
└── README.md    ← Este archivo
```

---

##  Instrucciones para Ejecutar

### Opción 1 — Abrir directamente (recomendada)
1. Descarga o clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/calculadora-fisica-samuel-rodriguez.git
   ```
2. Abre el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox, Edge).
3. ¡Listo! No se requiere servidor ni instalación adicional.

### Opción 2 — Servidor local con VS Code
1. Instala la extensión **Live Server** en Visual Studio Code.
2. Clic derecho sobre `index.html` → **"Open with Live Server"**.

---

##  Validaciones incluidas

- **Campo vacío:** Muestra aviso si algún campo está sin rellenar.
- **División por cero:** Detecta denominadores = 0 (tiempo, volumen, área, etc.).
- **Valores negativos:** Bloquea magnitudes que deben ser positivas (masa, altura, área).
- **Ángulo fuera de rango:** El ángulo θ debe estar entre 0° y 360°.
- **Enter en inputs:** Presionar Enter dentro de cualquier campo dispara el cálculo.

---

##  Tecnologías Utilizadas

- **HTML5** — Estructura semántica
- **CSS3** — Variables, Grid, animaciones, diseño responsive
- **JavaScript ES6** — Lógica de cálculo, validaciones, DOM

---

*Calculadora de Magnitudes Físicas · Samuel David Rodriguez Rodriguez · 2025*
