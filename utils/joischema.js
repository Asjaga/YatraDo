const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
        url: Joi.string().required,
        filename: Joi.string().required
    }),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category:Joi.string().valid("adventure", "beach", "hill-station", "religious", "luxury", "budget").required()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(100).max(260).required(),
})
module.exports.bookingSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    from_date:Joi.date().required(),
    to_date:Joi.date().required(),
    rooms:Joi.number().required()
});


module.exports.userSchema = Joi.object({
    email:Joi.string().required(),
    username: Joi.string().lowercase().required(),
    password: Joi.string().required(),
    name:Joi.string().required()
})


