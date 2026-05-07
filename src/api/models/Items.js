const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema(
    {
        id: Number,
        code: Number,
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
        taxes: { type: Number, required: true, default: 0 },
        total: { type: Number, required: true, default: 0 },
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
                this.body.items.quantity * this.body.items.unityPrice -
                this.body.items.quantity * this.body.items.unityPrice * ((this.body.items.discount || 0) / 100)

            total *= (this.body.itemTaxes / 100) + 1

            total = total.toFixed(2)
            return total
        }
        this.body = {
            id: this.body.items.id,
            code: this.body.items.code,
            category: this.body.items.category,
            unity: this.body.items.metricUnity,
            obsItem: this.body.items.obsItem,
            quantity: this.body.items.quantity,
            unityPrice: this.body.items.unityPrice,
            discount: this.body.items.discount,
            itemTaxes: this.body.items.taxes,
            total: priceTotalItem()
        }
    }

}

module.exports = { Items, ItemsSchema, ItemsModel }
