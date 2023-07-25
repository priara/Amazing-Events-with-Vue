const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: [],
      categorias: [],
      valorBusqueda: "",
      categoriasChecked: [],
      eventosFiltrados: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        console.log(this.eventos);
        this.eventosFiltrados = data.events
        this.categorias = [...new Set(data.events.filter((evento) => evento.category).map((evento) => evento.category))];
      })
      .catch((error) => console.log(error));
  },
  methods: {
    filtrar() {
        this.eventosFiltrados = this.eventos.filter(evento => {
                return evento.name.toLowerCase().startsWith(this.valorBusqueda.toLowerCase() ) 
                && (this.categoriasChecked.includes(evento.category) || this.categoriasChecked.length == 0 )
            })
        }
  }
}
const app = createApp(options);

app.mount("#app");
