import * as React from 'react';
import { Card, CardBody, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';

export default class SClistViewItem extends React.Component {
    
    state = {
        item: this.props.dataItem
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
   
    render() {
        const item = this.props.dataItem;
        const { expanded } = this.state;

        return (
           <Card style={{ maxWidth: 300, boxShadow: 'none', flex: '10 0 30.33%', margin: 10, border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)'}} >
          <CardBody style={{ padding: 0}}>
            <div style={{ padding: 0, float: 'left' }}>
              <CardTitle>
                {item.Title}
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
            <span className="k-button k-flat k-primary" onClick={this.toggleDetails}>Details</span> 
          </CardActions>
          </Card>
        );
    }
}
