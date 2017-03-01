Vue.component('formSlot', {
	template: '#form_template',
	props: {
		config: {
			type: Array,
			require: true,
		},
		// config:[
		// 	{
		// 		row:1
		// 		cols:2,
		// 	}
		// ]
	},
	data() {
		return {
			slotCount: [],
		}
	},
	methods: {
		slotCounter() {
			let vm = this;
			let counter = 1;
			for (let idx = 0; idx < vm.slotCount; idx++) {
				if (vm.slotCount.indexOf('slot' + counter) == -1) {
					vm.slotCount.push('slot' + counter);
					break;
				} else {
					counter++;
				}
			}
			return 'slot' + counter;
		}
	}
});

[
	[6, 6],
]