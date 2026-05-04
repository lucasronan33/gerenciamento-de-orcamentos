const mongoose = require('mongoose');
const validator = require('validator');

const BudgetItemSchema = new mongoose.Schema(
  {
    itemRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Items',
      default: null,
    },
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
  { _id: true }
);

const BudgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    code: { type: String, trim: true, required: true },
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

    date: { type: Date, required: true },
    time: { type: Date, required: true },
    validUntil: { type: Date, required: true },

    client: {
      name: { type: String, trim: true, required: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      cpfcnpj: { type: String, trim: true },
      address: {
        street: { type: String, trim: true },
        number: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
      },
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

    },

    shipping: {
      type: String,
      enum: [
        'Sem Frete',
        'CIF',
        'FOB',
        'Valor Customizado',
      ],
      default: 'Sem Frete'
    },
    totals: {
      subtotal: { type: Number, required: true, default: 0 },
      taxes: { type: Number, required: true, default: 0 },
      globalDiscount: { type: Number, required: true, default: 0 },
      shippingFee: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true, default: 0 },
    },
  },
  {
    timestamps: true
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

    if (!this.body.client.name) this.errors.push('Nome do cliente é um campo obrigatorio')
    if (!this.body.date || !validator.isDate(this.body.date)) this.errors.push('Data ou formato da data invalido')
    if (!this.body.validUntil || !validator.isDate(this.body.validUntil)) this.errors.push('Data ou formato da data invalido')
    if (!this.body.time || !validator.isTime(this.body.time)) this.errors.push('Horario ou formato do horario invalido')
    if (this.body.client.email && !validator.isEmail(this.body.client.email)) this.errors.push('email invalido')

  }

  cleanUp() {
    this.body = {
      code: this.body.budgetNumber,
      status: this.body.budgetStatus,

      date: this.body.date,
      time: this.body.time,
      validUntil: this.body.validity,

      client: {
        name: this.body.clientName,
        phone: this.body.tel,
        email: this.body.email,
        cpfcnpj: this.body.cpf_cnpj,
        address: {
          street: this.body.street,
          number: this.body.streetNumber,
          city: this.body.city,
          state: this.body.state,
          zipCode: this.body.zipCode,
        },
      },

      items: this.body.items || [],

      conditions: {
        paymentMethod: this.body.paymentMethod,
        shippingTime: this.body.deliveryTime,
        paymentConditions: this.body.paymentConditions,
        warranty: this.body.warranty,
        obsBudget: this.body.obsBudget,
        termsConditions: this.body.termsConditions,

      },

      shipping: this.body.shippingType,
      totals: {
        subtotal: 0,
        taxes: this.body.taxes,
        globalDiscount: this.body.globalDiscount,
        shippingFee: this.body.shippingFee,
        total: 0,
      },
    }
  }
}

module.exports = { Budget, BudgetModel, BudgetSchema, BudgetItemSchema }
