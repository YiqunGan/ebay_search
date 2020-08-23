const InputModel = require("../models/model.input");

class InputService
{
    static create(data){
        let newInput = new InputModel(data.keyword, data.minprice, data.maxprice);
        return newInput;
    }
}
//, data.new1, data.used, data.verygood, data.goood, data.acceptable, data.return1, data.free, data.expedited, data.sortby,data.curUrl