# 🎉 Aplicación de Sorteo

Una aplicación web simple y elegante para realizar sorteos de correos electrónicos. Construida con HTML, CSS y JavaScript puro, sin necesidad de herramientas de construcción.

## 🚀 Cómo usar

### Requisitos
- Solo necesitas un navegador web moderno (Chrome, Firefox, Safari, Edge)

### Instrucciones
1. **Abrir la aplicación**: Simplemente abre el archivo `index.html` en tu navegador web
   - Haz doble clic en el archivo
   - O haz clic derecho → "Abrir con" → tu navegador preferido

2. **Añadir participantes**:
   - Ingresa un correo electrónico válido en el campo de texto
   - Haz clic en "Agregar" o presiona Enter
   - El correo aparecerá en la lista de participantes

3. **Gestionar participantes**:
   - Usa el botón "Eliminar" junto a cada correo para removerlo
   - Los correos duplicados son automáticamente rechazados
   - El contador muestra el número total de participantes

4. **Realizar el sorteo**:
   - Asegúrate de tener al menos 2 participantes
   - Haz clic en "🎲 Elegir ganador"
   - Disfruta de la animación de selección
   - El ganador será destacado en amarillo y mostrado en la sección de resultados

5. **Nuevo sorteo**:
   - Usa "🔄 Nuevo sorteo" para limpiar el resultado y elegir otro ganador
   - Los participantes se mantienen en la lista

## ✨ Características

- **Validación de emails**: Verifica que los correos tengan formato válido
- **Prevención de duplicados**: No permite agregar correos repetidos
- **Persistencia local**: Los participantes se guardan automáticamente en el navegador
- **Diseño responsivo**: Funciona perfectamente en móviles y escritorio
- **Animaciones suaves**: Experiencia de usuario fluida y atractiva
- **Accesibilidad**: Estructura semántica y roles ARIA para lectores de pantalla

## 🎨 Diseño

- **Paleta moderna**: Gradientes púrpuras y dorados para un aspecto elegante
- **Interfaz centrada**: Layout limpio y profesional
- **Estados visuales**: Hover, focus y transiciones cuidadosamente diseñados
- **Feedback inmediato**: Mensajes de éxito y error claros

## 📁 Estructura de archivos

```
SorteoApp/
├── index.html      # Página principal con estructura HTML
├── styles.css      # Estilos CSS completos y responsivos
├── script.js       # Lógica JavaScript de la aplicación
└── README.md       # Este archivo de instrucciones
```

## 🔧 Tecnologías utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con Grid, Flexbox y animaciones
- **JavaScript ES6+**: Lógica de aplicación moderna
- **LocalStorage**: Persistencia de datos en el navegador

## 📱 Compatibilidad

La aplicación es compatible con:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🚨 Notas importantes

- **No requiere servidor**: Funciona completamente en el cliente
- **Sin dependencias**: No necesita npm, webpack ni herramientas similares
- **Datos locales**: Los participantes solo se guardan en tu navegador
- **Seguridad**: Validación de entrada para prevenir XSS

## 🎯 Uso ideal

Perfecto para:
- Sorteos en eventos o reuniones
- Seleccionar ganadores en redes sociales
- Decisiones aleatorias en equipos
- Actividades educativas

---

**¡Disfruta realizando tus sorteos!** 🎊
