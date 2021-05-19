import * as React from 'react';
import { Card, CardBody, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Checkbox } from "@progress/kendo-react-inputs";

export default class SClistViewItem extends React.Component {
    
    state = {
        item: this.props.dataItem,
        checked: false
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.dataItem.Id !== this.props.dataItem.Id){
            this.setState({
                item: this.props.dataItem
            });
        }
    }

    toggleDetails = (e) =>{
      if(this.props.setOpenItems)
        this.props.setOpenItems(this.props.dataItem);
    }

    handleChange = (e) =>{
      if(e.value && this.props.addSelectedItemId)
        this.props.addSelectedItemId(this.props.dataItem.Id);
      
      if(!e.value && this.props.removeSelectedItemId)
        this.props.removeSelectedItemId(this.props.dataItem.Id);

      this.setState({
          checked: e.value
      });
    }
   
    render() {
        const item = this.props.dataItem;
        const { checked } = this.state;

        return (
           <Card style={{ maxWidth: 300, maxHeight: 135, boxShadow: 'none', flex: '10 0 30.33%', margin: 10, border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)'}} >
          <CardBody style={{ padding: 0}}>
            <div style={{ padding: 0, float: 'left' }}>
              <CardTitle>
                {this.props.searchMode === 'd' ? item.Division : item.Title}
              </CardTitle>
              <CardSubtitle className='cardScore'>
                <button title={"Show Details"} className="k-button k-flat cardScore" onClick={this.toggleDetails}>{item.Subtitle}</button>                 
              </CardSubtitle>
            </div>
            <div style={{ float: 'right' }}>
              <CardImage src={item.Image} style={{ height: 70, width: 90 }} /><br/>
              <span >
                  {item.Risk}
              </span>
            </div>        
          </CardBody>
           <CardActions style={{ padding: 0}}>
            {/* <span className="k-button k-flat k-primary" onClick={this.toggleDetails}>Details</span> */}
            <Checkbox className="k-button k-flat k-primary" label={"Select to compare"} checked={checked} onChange={this.handleChange}/>
          </CardActions>
          </Card>
        );
    }
}
