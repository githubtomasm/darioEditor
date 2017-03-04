moment().format('l');
moment().locale('es');

let App = new Vue({
	el: '#app',
	data: {
		activeView: "libros",
		newItemOpen: false,
		editItemOpen: false,
		dataBase: {
			libros: [
				// {
				// 	id:Number,
				// 	titulo:String,
				// 	fecha:date,
				// 	imgUrl:String,
				// 	descripcion:String
				// }
			],
			cyp: [
				// {
				// 	id:Number,
				// 	titulo:String,
				// 	libroId:Number,
				// 	tipo:String, //cuento o poema
				// 	descripcion:String,
				// 	contenido:String,
				// }
			],
			crono: [
				// {
				// 	id:Number,
				// 	evento:String,
				// 	descripcion:String,
				// 	fecha:date,
				// }
			],
			propJ: [
				// {
				// 	id:Number,
				// 	titulo:String,
				// 	contenido:String,
				// 	autor:String,
				// 	descripcion:String,
				// 	likes:number,
				// 	dislike:number,
				// }
			]
		},
		types: {
			'libros': 'libroTemporal',
			'cyp': 'cypTemporal',
			'crono': 'eventoTemporal',
			'propJ': 'propuestaTemproal'
		},
		libroTemporal: {
			id: null,
			titulo: null,
			fecha: null,
			imgUrl: null,
			descripcion: null
		},
		cypTemporal: {
			id: null,
			titulo: null,
			libroId: null,
			tipo: null, //cuento o poema
			descripcion: null,
			contenido: null,
		},
		eventoTemporal: {
			id: null,
			evento: null,
			descripcion: null,
			fecha: null
		},
		propuestaTemproal: {
			id: null,
			titulo: null,
			contenido: null,
			autor: null,
			descripcion: null,
		},
		columns: {
			libros: [{
				name: 'Id',
				idx: 'id',
				date: false
			}, {
				name: 'Título',
				idx: 'titulo',
				date: false
			}, {
				name: 'Fecha',
				idx: 'fecha',
				date: true
			}, {
				name: 'Imagen URL',
				idx: 'imgUrl',
				date: false
			}, {
				name: 'Descripción',
				idx: 'descripcion',
				date: false
			}, ],
			cyp: [{
				name: 'Id',
				idx: 'id',
				date: false
			}, {
				name: 'Título',
				idx: 'titulo',
				date: false
			}, {
				name: 'Tipo',
				idx: 'tipo',
				date: false
			}, {
				name: 'Descripción',
				idx: 'descriptcion',
				date: false
			}, {
				name: 'Contenido',
				idx: 'contenido',
				date: false
			}],
			crono: [{
				name: "Id",
				idx: "id",
				date: false
			}, {
				name: "Evento",
				idx: "evento",
				date: false
			}, {
				name: "Descripción",
				idx: "descripcion",
				date: false
			}, {
				name: "Fecha",
				idx: "fecha",
				date: true
			}],
			propJ: [{
				name: "Id",
				idx: 'id',
				date: false
			}, {
				name: "Título",
				idx: 'titulo',
				date: false
			}, {
				name: "Contenido",
				idx: 'contenido',
				date: false
			}, {
				name: "Autor",
				idx: 'autor',
				date: false
			}, {
				name: "Descripción",
				idx: 'descripcion',
				date: false
			}, ]
		}
	},
	watch: {
		newBookOpen(newval, oldval) {
			this.$set("editItemOpen", false);
			this.reset('libroTemporal');
		}
	},
	events: {
		"editItemEvent": function(objItem) {
			// console.log('event edit');
			this.editItem(objItem.type, objItem.item);
		},
		"deleteItemEvent": function(objItem) {
			// console.log('event delete');
			this.deleteItem(objItem.type, objItem.item);
		}
	},
	computed: {},
	ready() {
		this.openState();
	},
	methods: {
		openState() {
			let vm = this;
			if (localStorage.data != undefined) {
				vm.$set('dataBase', JSON.parse(localStorage.data));
			} else {
				console.log('nada')
			}
		},
		saveState() {
			let vm = this;
			localStorage.setItem('data', JSON.stringify(vm.dataBase));
			swal('Guardado', 'Los datos han sido almacenados', 'success');
		},
		lastId(elemento) {
			let vm = this;
			if (vm.dataBase[elemento].length != 0) {
				let lastid = vm.dataBase[elemento][vm.dataBase[elemento].length - 1].id + 1;
				return lastid;
			} else {
				return 1;
			}
		},
		reset(elemento) {
			let vm = this;
			for (let item in vm[elemento]) {
				vm.$set(elemento + '.' + item, null);
			}
		},
		cancelBtn() {
			this.$set("newItemOpen", false);
			this.$set('editItemOpen', false);
		},
		createElement(type) {
			let vm = this;
			this.$set(this.types[type] + ".id", vm.lastId(type));
			this.dataBase[type].push(JSON.parse(JSON.stringify(this[this.types[type]])));
			vm.reset(this.types[type]);
			vm.$set('newItemOpen', false);
		},
		editItem(type, item) {
			let vm = this;
			vm.$set('newItemOpen', true);
			vm.$set('editItemOpen', true);
			for (let x in item) {
				vm.$set(vm.types[type] + '.' + x, item[x]);
			}
		},
		updateItem(type) {
			let vm = this;
			let idx = null;
			for (let i = 0; i < vm.dataBase[type].length; i++) {
				if (vm.dataBase[type][i].id == vm[vm.types[type]].id) {
					idx = i;
				}
			}
			// console.log(idx);
			vm.$set('dataBase.' + type + '[' + idx + ']', JSON.parse(JSON.stringify(vm[vm.types[type]])));
			this.cancelBtn();
		},
		deleteItem(type, item) {
			let vm = this;
			swal({
					title: "Estás seguro?",
					text: "Se liminará de manera permanente el elemento seleccionado",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Borrar!",
					closeOnConfirm: false
				},
				function() {
					vm.dataBase[type].$remove(item);
					swal("Eliminado!", "El elemento fue eliminado", "success");
				});
		}
	}
});