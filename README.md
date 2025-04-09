# Research
My work is for scheduling data centre workload using renewable energy like solar and wind.
And solar, wind and data center workload are uncertainity in real world.
So, we should prepare and manage the robust scheduling system to meet the constraints such as deadline, priority, working time, job completion time and less consumption of brown energy as a cost.
We have been used workload demand from google cluster data and also wind and solar draft data from the source of perfect website.
We have been used deep learning method to predict wind,solar and workload demand for future scheduling.
We have been used stochastic scheduling system to make the best decisions when factors are unpreditable (wind,solar and workload)
In reality, amount of RE available and computing jobs arriving at DCs are unpredictable. We cannot know these things for sure. (Main problem)
Becuase RE may be changing all the time and workload demand change unexpectedly.
So we have been designed Stochastic optimization for these uncertainty.
How will stochastic optimization work?
It will be worked with probabilities or potential change for future energy and job arrivals.
Our goal is to find a robust system or policy to minimize the expected cost like brown energy usage and manage risks like minimizing the probability of violation Service Level Agreement
SLA such as job completion time, response time and throughput (Performance contracts)
We have been used MDP Markkov Decision Process to model sequential problems decision making under uncertainty in our stochastic scheduling system for DCs with state transitions, cost , constraints.
For prediction of wind, solar and worload demand as a challenge because that we already mentioned that are uncertainty for future like we do not know how exactly how much workload or RE will have later, for that we have been used Gussian Process GPs , gives probability distribution over possible future values instead of predicting single future value. 
GPs is probabilistic forecasts like if sunny now, it is likely still sunny in 5 min we can predict , it can model smooth and pattern of changing.
So GPs have been used to model future w_t and e_t.


We would like to share essential information our scheduler needs to do are below:
1. s_t at any time t
2. w_t workload (combination of s_t) : What jobs are currently running , waiting, requrirements, priorities
3. e_t Renewable energy: How much RE is available currenlty or predicted shortly
4. r_t resource usage: How busys DCs servers and networks , these are resource utilization
