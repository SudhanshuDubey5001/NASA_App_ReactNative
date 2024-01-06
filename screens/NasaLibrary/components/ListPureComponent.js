import { PureComponent } from "react";
import ListItem from "./ListItem";

export default class ListPureComponent extends PureComponent{
    render(){
        return(
            <ListItem
                item={this.props.item}
                onPressKeyword={this.props.onPressKeyword}
                onPressDataItem={this.props.onPressDataItem}
              />
        );
    }
}