import PizzaCardList from "./components/PizzaCardList"



 
renderRoute() {
  switch(window.location.hostname){
    case '/': return <PizzaCardList pizzas={this.allPizzas()} title="Allpizza"/>
    case '/PIZZA-TRADICIONAL': return <PizzaCardList pizzas={this.pizzaTradicional()} title="PIZZA TRADICIONAL"/>
    case '/PIZZA-ESPECIAL': return <PizzaCardList pizzas={this.pizzaEspecial()} title="PIZZA ESPECIAL"/>
    case '/PIZZA-DOCE': return <PizzaCardList pizzas={this.pizzaDoce()} title="PIZZA DOCE"/>
    default:return <Notfound />
  }
}