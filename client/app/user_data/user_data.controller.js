'use strict';

angular.module('wessApp')
  .controller('UserDataCtrl', function ($scope) {
    
    $scope.myInterval = 20000;
    $scope.slides = [
        {
            name: 'Julia Knapp',
            affiliation: 'MSc. Hydrogeology, University of Tübingen',
            description: 'We are interested in respiration and primary production rates in small tributaries to the Ammer river. For this, we perform gas tracer tests to determine the reaeration flux across the air water interface. From oxygen measurements, together with short wave solar radiation data (provided by the Ammertal network project), we are then able to model diurnal curves of respiration and primary production. So far, studies of this type have been conducted for the Himbach and for a short section of the Ammer itself.'
        },
        {
            name: 'Verena Hof',
            affiliation: 'BSc. Environmental Physics, University of Tübingen',
            description: 'My thesis is part of the research carried out in the atmospheric physics research group at the ZAG (Zentrum für angewandte Geowissenschaften) on the transition between the mostly-stable atmosphere at night and the convective boundary layer forming by day. This development follows the same overall pattern on sunny, high pressure days and is called the “morning transition”. The general behavior and sequence of events is well understood but more detailed and quantitative descriptions would be of great interest as near surface conditions like fog and frost formation or contaminant spreading are directly influenced by the morning transition. The whole troposphere is indirectly influenced by processes occurring on the surface.  The daily exchanges between the land and atmosphere of heat, moisture, and pollutants, are also influenced by the transition. \n \
I will try to define and quantify parameters that influence the starting time of the morning transition. Therefore data from the Ammertal Network ground stations is analyzed for certain time periods with similar synoptic scale and seasonal conditions. The measurements used are mainly temperature, solar and infrared radiation, humidity, wind and some eddy covariance flux data.'
        },
        {
            name: 'Zhongwen Bao',
            affiliation: 'IRTG, Department of Geosciences, University of Tübingen',
            description: 'We study temperature-driven partitioning of pollutants among different compartments, i.e. soils, the atmosphere and vegetation. Linear partitioning of chemical pollutants is applied with temperature dependence at the specific time and location. Temperature changes observed in the field, provided by the Ammertal Network stations, will be combined to simulate the field observations in the concentration evolution of atmospheric pollutants.'
        },
        {
            name: 'Bachelor\'s students',
            affiliation: 'Environmental Physics, University of Tübingen',
            description: 'During the two-weeks summer field campaign students in their 4th semester of the Bachelor’s program Umweltnaturwissenschaften at the ZAG (Zentrum für angewandte Geowissenschaften) of the University of Tübingen measure physical and chemical parameters in a local stream. The overall goal is to practice field work techniques and to develop a model of the different processes occurring in a section of the stream, like chemical depletion, diffusion processes or heat flux.  For the energy budget calculations students of the past two years used solar and infrared radiation data measured by the net radiometers of the Ammertal Network ground stations. With this data the students were able to compute the net heat flux into the water body.'
        }
    ]
  });
