import * as React from 'react';
import { Dialog, DialogActionsBar, Window  } from '@progress/kendo-react-dialogs';
import { Card, CardBody, CardTitle, CardImage, CardSubtitle } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const scoreDetails = [ 
    {
        "Percentage": 5,
        "Category": "Acceleration",
        "Events": "11"
    },
    {
        "Percentage": 30,
        "Category": "Braking",
        "Events": "36"
    },
    {
        "Percentage": 5,
        "Category": "Cornering",
        "Events": "18"
    },
    {
        "Percentage": 20,
        "Category": "Seatbelt",
        "Events": "5"
    },
    {
        "Percentage": 10,
        "Category": "Speeding {Posted}",
        "Events": "16"
    },
    {
        "Percentage": 27,
        "Category": "Speeding {80+}",
        "Events": "8"
    },
];

const ScorePanelBarTitle = ({ Title, Score }) => {
    return (
      <div style={{ width: '80%' }}>
        <div style={{ float: 'left', textAlign: 'left', fontSize: '30px'}}>{Score}</div>
        <div style={{ lineHeight: '40px'}}><span>&nbsp;&nbsp;&nbsp;</span>{Title}</div>
      </div>
    );
};

export default class SCwindow extends React.Component {
    
    state = {
        visible: true
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    windowClosed = (e) =>{
      if(this.props.onClose)
        this.props.onClose(this.props.Item.Id);
      this.setState({
          visible: false
      });
    }
   
    render() {        
      const { visible } = this.state;
      const item = this.props.Item;

      return (
        // visible ? <Window key={this.props.key} title={this.props.Item.Title} onClose={this.windowClosed} initialHeight={350}>
        // </Window> : null
        <Window key={this.props.key} title={this.props.Item.Title} onClose={this.windowClosed} initialHeight={350}>

        <Card style={{boxShadow: 'none', flex: '10 0 30.33%', margin: 10, border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)'}} >
          <CardBody style={{ padding: 0}}>
            <div style={{ padding: 0, float: 'left' }}>
              <CardTitle>
                {item.Title}
              </CardTitle>
              <CardSubtitle className='cardScore'>
                <span>{item.Subtitle}</span>                 
              </CardSubtitle>
            </div>
            <div style={{ float: 'right' }}>
              <CardImage src={item.Image} style={{ height: 70, width: 90 }} /><br/>
              <span >
                  {item.Risk}
              </span>
            </div>        
          </CardBody>          
          </Card>

          <PanelBar expandMode="single">
              <PanelBarItem title={<ScorePanelBarTitle Title={"Telematics"} Score={"50"} />}>
                <div>
                  <div >                    
                    <span>
                      <h2>Score            50/100</h2>
                      <p>Score weight 70% <br/> Calculated Monthly (rolling basis)</p>
                    </span>
                  </div>

                  <div >
                    <Grid
                      style={{ height: '300px', width: '100%' }}
                      data={[ ...scoreDetails ]}
                    >
                      <Column field="Percentage" title="%" width="40"/>
                      <Column field="Category" title="Category" width="125" />
                      <Column field="Events" title="Events" />                      
                    </Grid>
                  </div>                  
                </div>
              </PanelBarItem>
               <PanelBarItem title={<ScorePanelBarTitle Title={"Accidents"} Score={"100"} />}>
                <div>
                  <div >                    
                    <span>
                      <h2>Score            100/100</h2>
                      <p>Score weight 60% <br/> Calculated Monthly (rolling basis)</p>
                    </span>
                  </div>

                  <div >
                     <Grid
                      style={{ height: '300px', width: '100%' }}
                      data={[ ...scoreDetails ]}
                    >
                      <Column field="Percentage" title="%" width="40"/>
                      <Column field="Category" title="Category" width="125" />
                      <Column field="Events" title="Events" />                      
                    </Grid>
                  </div>                  
                </div>
              </PanelBarItem>
              <PanelBarItem title={<ScorePanelBarTitle Title={"Violations"} Score={"70"} />}>
                <div>
                  <div >                    
                    <span>
                      <h2>Score            70/100</h2>
                      <p>Score weight 50% <br/> Calculated Monthly (rolling basis)</p>
                    </span>
                  </div>

                  <div >
                     <Grid
                      style={{ height: '300px', width: '100%' }}
                      data={[ ...scoreDetails ]}
                    >
                      <Column field="Percentage" title="%" width="40"/>
                      <Column field="Category" title="Category" width="125" />
                      <Column field="Events" title="Events" />                      
                    </Grid>
                  </div>                  
                </div>
              </PanelBarItem>
              <PanelBarItem title={<ScorePanelBarTitle Title={"Risk"} Score={"+3"} />}>
                <div>
                  <div >                    
                    <span>
                      <h2>Score            +3</h2>
                      <p>Score weight 40% <br/> Calculated Monthly (rolling basis)</p>
                    </span>
                  </div>

                  <div >
                     <Grid
                      style={{ height: '300px', width: '100%' }}
                      data={[ ...scoreDetails ]}
                    >
                      <Column field="Percentage" title="%" width="40"/>
                      <Column field="Category" title="Category" width="125" />
                      <Column field="Events" title="Events" />                      
                    </Grid>
                  </div>                  
                </div>
              </PanelBarItem>
              <PanelBarItem title={<ScorePanelBarTitle Title={"MVR"} Score={"-5"} />}>
                <div>
                  <div >                    
                    <span>
                      <h2>Score            -5</h2>
                      <p>Score weight 30% <br/> Calculated Monthly (rolling basis)</p>
                    </span>
                  </div>

                  <div >
                     <Grid
                      style={{ height: '300px', width: '100%' }}
                      data={[ ...scoreDetails ]}
                    >
                      <Column field="Percentage" title="%" width="40"/>
                      <Column field="Category" title="Category" width="125" />
                      <Column field="Events" title="Events" />                      
                    </Grid>
                  </div>                  
                </div>
              </PanelBarItem>
            </PanelBar>

        </Window> 
      );
    }
}
