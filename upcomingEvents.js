const { createApp } = Vue;

const options = {
    data() {
        return {
            eventos: [],
            categorias: [],
            valorBusqueda: "",
            categoriasChecked: [],
            eventosFuturos: [],
            currentDate: "",
            aux: []
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((respuesta) => respuesta.json())
            .then((data) => {
                this.eventos = data.events;
                console.log(this.eventos);
                this.currentDate = data.currentDate
                this.eventosFuturos = data.events.filter((evento ) => evento.date > this.currentDate)
                this.categorias = [...new Set(data.events.filter((evento) => evento.category).map((evento) => evento.category))];
                console.log(this.eventosFuturos);
                console.log(this.categoriasChecked);
                console.log(this.valorBusqueda);
                this.aux = this.eventosFuturos
                
            })
            .catch((error) => console.log(error));
    },
    methods: {
        filtrar() {
            this.aux = this.eventosFuturos.filter(evento => {
                return evento.name.toLowerCase().startsWith(this.valorBusqueda.toLowerCase())
                    && (this.categoriasChecked.includes(evento.category) || this.categoriasChecked.length == 0)
            })
            console.log(this.valorBusqueda);
        },
    }
}
const app = createApp(options);

app.mount("#app");