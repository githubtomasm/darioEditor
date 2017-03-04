Vue.component('tabla', {
	template: "#tabla_template",
	props:{
		data:null,
		editswitch:null,
		editingItem:null,
		type:null,
		columns:[],
	},
	methods:{
		dateFormat(date, inFormat, outFormat) {
			// console.log(date, inFormat, outFormat);
			return moment(date, inFormat).format(outFormat);
		},

		editItem(item){
			this.$dispatch('editItemEvent',{
				type:this.type,
				item:item,
			})
		},
		deleteItem(item){
			this.$dispatch('deleteItemEvent',{
				type:this.type,
				item:item,
			});
		},
		shortText(text, chars){
			text = text.slice(0,chars);
			return text+"...";
		}

	}
});