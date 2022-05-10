class Product{
    Product(name, price, color){
        this.name = name;
        this.price = price;
        this.color = color;
     
        this.getName = function(){
            return this.name;
        };
        this.getPrice= function(){
            return this.price;
        };
        this.getColor= function(){
            return this.color;
        };
    
    }
}