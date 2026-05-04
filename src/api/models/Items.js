const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema(
    {
        category: String,
        unity: {
            type: String,
            enum: [
                'Unidade',
                'Peça',
                'Kg',
                'M',
                'M²',
                'M³',
                'Litro',
                'Hora',
            ],
            default: 'Unidade',
            required: true,
        },
        obsItem: { type: String, default: '' },
        quantity: { type: Number, required: true, default: 1 },
        unityPrice: { type: Number, required: true, default: 0 },
        discount: { type: Number, required: true, default: 0 },
        itemTaxes: { type: Number, required: true, default: 0 },
        priceTotalItem: { type: Number, required: true, default: 0 },
    },
    {
        _id: true,
        timestamps: true,
    }
);


const ItemsModel = mongoose.model('Items', ItemsSchema);

class Items {
    constructor(body) {
        this.body = body
        this.errors = []
        this.item = null
    }
    async register() {
        this.validation()
        if (this.errors.length > 0) return

        this.item = await ItemsModel.create(this.body)
    }

    async findById(id) {
        if (typeof id !== 'string') return

        const item = await ItemsModel.findById(id)
        return item
    }

    validation() {
        this.cleanUp()

        if (this.body.quantity < 1) this.errors.push('A quantidade deve ser igual ou maior do que 1')
        if (this.body.unityPrice < 0) this.errors.push('O preço unitário deve ser igual ou maior do que 0')
        if (this.body.discount < 0) this.errors.push('O desconto deve ser igual ou maior do que 0')
        if (this.body.itemTaxes < 0) this.errors.push('O imposto deve ser igual ou maior do que 0')
    }

    cleanUp() {

        const priceTotalItem = () => {
            let total =
                this.body.quantity * this.body.unityPrice -
                this.body.quantity * this.body.unityPrice * ((this.body.itemDiscount || this.body.discount || 0) / 100)

            total *= (this.body.itemTaxes / 100) + 1

            total = total.toFixed(2)
            return total
        }
        this.body = {
            category: this.body.category,
            unity: this.body.metricUnity || this.body.unity,
            obsItem: this.body.obsItem,
            quantity: this.body.quantity,
            unityPrice: this.body.unityPrice || 0,
            discount: this.body.itemDiscount || this.body.discount || 0,
            itemTaxes: this.body.itemTaxes || 0,
            priceTotalItem: priceTotalItem()
        }
    }

}

module.exports = { Items, ItemsSchema, ItemsModel }
