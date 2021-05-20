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

export default class SCcompareWindow extends React.Component {
    
    state = {        
        
    };

    render() {      
      const item = this.props.Item;

      return (        
        // <Window ref={(p) => { this.props.onOpen(p); }} left={left} top={top} onMove={this.handleMove} 
        // key={''+item.Id} {this.props.searchMode === 'd' ? item.Division : item.Title} onClose={this.windowClosed} initialHeight={500} initialWidth={this.props.initialWidth} >
        <Window ref={(p) => { this.props.onOpen(p); }} modal minimizeButton={()=> null}
          key={''+item.Id} title={this.props.searchMode === 'd' ? item.Division : item.Title} onClose={this.windowClosed} initialHeight={500} initialWidth={this.props.initialWidth} >

        <Card style={{boxShadow: 'none', flex: '10 0 30.33%', margin: 10, border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)'}} >
          <CardBody style={{ padding: 0}}>
            <div style={{ padding: 0, float: 'left' }}>
              <CardTitle>
                {this.props.searchMode === 'd' ? item.Division : item.Title}
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

          <PanelBar expandMode="multiple">
              <PanelBarItem title={'Telematics'}>
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
               <PanelBarItem title={'Accidents'}>
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
              <PanelBarItem title={'Violations'}>
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
              <PanelBarItem title={'Risk'}>
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
              <PanelBarItem title={'MVR'}>
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
