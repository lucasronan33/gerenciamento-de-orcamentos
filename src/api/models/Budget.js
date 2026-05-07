const mongoose = require('mongoose');
const validator = require('validator');

function generateBudgetCode() {
  return Date.now()
}

const BudgetItemSchema = new mongoose.Schema(
  {
    itemRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Items',
      default: null,
    },
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
  { _id: true }
);

const BudgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    basic: {
      code: { type: String, trim: true, required: true },
      name: { type: String, trim: true, required: true },
      status: {
        type: String,
        enum: [
          'Rascunho',
          'Enviado',
          'Aprovado',
          'Rejeitado',
          'Finalizado',
        ],
        default: 'Rascunho',
        required: true
      },

      date: { type: String, required: true },
      time: { type: String, required: true },
      validUntil: { type: String, required: true },
    },

    client: {
      enterpriseName: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      cpf_cnpj: { type: String, trim: true },
      address: {
        street: { type: String, trim: true },
        number: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
      },
      default: {}
    },

    items: [BudgetItemSchema],

    conditions: {
      paymentMethod: {
        type: String,
        enum: [],
        default: 'À vista',
        required: true,
      },
      shippingTime: { type: String, trim: true },
      paymentConditions: { type: String, trim: true },
      warranty: { type: String, trim: true },
      obsBudget: { type: String, trim: true },
      termsConditions: { type: String, trim: true },
      default: {},
    },

    totals: {
      subtotal: { type: Number, required: true, default: 0 },
      taxes: { type: Number, required: true, default: 0 },
      discount: { type: Number, required: true, default: 0 },
      shipping: { type: Number, required: true, default: 0 },
      shippingType: {
        type: String,
        enum: [
          'Sem Frete',
          'CIF',
          'FOB',
          'Valor Customizado',
        ],
        default: 'Sem Frete'
      },
      total: { type: Number, required: true, default: 0 },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const BudgetModel = mongoose.model('Budget', BudgetSchema);

class Budget {
  constructor(body) {
    this.body = body
    this.errors = []
    this.budget = null
  }
  async register() {
    console.log('body: ', this.body)
    this.validation()
    if (this.errors.length > 0) return

    this.budget = await BudgetModel.create(this.body)
  }

  async findById(id) {
    if (typeof id !== 'string') return

    const budget = await BudgetModel.findById(id)
    return budget
  }

  validation() {
    this.cleanUp()

    if (!this.body.basic.name) this.errors.push({ name: 'Nome do cliente é um campo obrigatorio' })
    if (!this.body.basic.date || !validator.isDate(this.body.basic.date)) this.errors.push({ date: 'Data ou formato da data invalido' })
    if (!this.body.basic.validUntil || !validator.isDate(this.body.basic.validUntil)) this.errors.push({ validUntil: 'Data ou formato da data invalido' })
    if (!this.body.basic.time || !validator.isTime(this.body.basic.time)) this.errors.push({ time: 'Horario ou formato do horario invalido' })
    if (this.body.client.email && !validator.isEmail(this.body.client.email)) this.errors.push({ email: 'email invalido' })

  }

  cleanUp() {
    const toNumber = (value, defaultValue = 0) => {
      if (value === undefined || value === null || value === '') return defaultValue
      return Number(value)
    }

    const calcSubtotal = () => {
      const subtotal = this.body.items.reduce((acc, item) => {
        const value = Number(item.total) || 0
        return acc + value
      }, 0).toFixed(2)
      return Number(subtotal)
    }

    const calcTotal = () => {
      const subtotal = calcSubtotal()

      let total = Number(subtotal) + Number(this.body.totals.shipping)
      total -= (total * (this.body.totals.discount / 100))
      total *= ((this.body.totals.taxes / 100) + 1)
      return (total.toFixed(2))
    }

    const normalizeShipping = (value) => {
      const shippingMap = {
        'CIF (por nossa conta)': 'CIF',
        'FOB (por conta do cliente)': 'FOB',
      }

      return shippingMap[value]
    }

    console.log('this.body: ', this.body)

    this.body = {
      user: this.body.user || null,
      basic: {
        code: this.body.basic.code || generateBudgetCode(),
        date: this.body.basic.date,
        name: this.body.basic.name,
        status: this.body.basic.status,
        time: this.body.basic.time,
        validUntil: this.body.basic.validUntil,
      },

      client: this.body.client || {},

      items: this.body.items || [],

      conditions: this.body.conditions || {},

      totals: {
        subtotal: calcSubtotal(),
        taxes: toNumber(this.body.totals.taxes),
        discount: toNumber(this.body.totals.discount),
        shipping: toNumber(this.body.totals.shipping),
        shippingType: normalizeShipping(this.body.totals.shippingType),
        total: calcTotal(),
      },
    }
  }
}

module.exports = { Budget, BudgetModel, BudgetSchema, BudgetItemSchema }
