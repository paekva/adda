import {Product} from "../../types/Product";
import {connect} from "react-redux";
import "./ProductList.css";

export type ProductListProps = {
    products: Product[]
}
const ProductList = (props: ProductListProps) => {


    return <div className='gridWrapper'>
        {
            props.products.map((el) => {
                return <div className={'productEl'}>
                    <div className={'image'}> image </div>
                    <div className='controls'>
                        <div>
                            {el.name}
                            {el.cost}
                        </div>

                        <button onClick={() => console.warn(el.id)} >+</button>
                    </div>
                </div>
            })
        }
    </div>
}

export default connect()(ProductList);