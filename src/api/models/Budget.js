const mongoose = require('mongoose');

const BudgetItemSchema = new mongoose.Schema(
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
  }, { _id: true }
)

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

    condtions: {
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

module.exports = mongoose.model('Budget', BudgetSchema);
