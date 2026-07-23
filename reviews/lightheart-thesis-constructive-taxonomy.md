# Constructive Spiking Neural Networks: a taxonomy bridge

> Status: Automated draft, not yet human-reviewed.

Toby Asher Lightheart's thesis, *Constructive Spiking Neural Networks for Simulations of Neuroplasticity* (2018), is useful here less as a single paper to summarize and more as a bridge between two parts of the literature that often use different language.

The current web book begins with classic constructive neural-network methods such as Dynamic Node Creation and Cascade-Correlation. Those methods mostly sit in a supervised-learning tradition: start with too little capacity, monitor training behaviour, add units or modules, and continue. The thesis extends the same family of questions into spiking simulations, where the timing of events, local component behaviour, and biological-plausibility constraints become part of the constructive mechanism.

## Why the thesis matters for this review

Chapter 2 argues that constructive neural-network research is fragmented by terminology. Similar structural changes appear under names such as constructive neural networks, growing neural networks, evolving connectionist systems, structural plasticity, adaptive structure, and pruning. The thesis proposes a broader vocabulary that is useful for this web book:

- a constructive algorithm can create new synapses or neurons;
- a constructive neural network is an ANN whose structure is modified by such an algorithm during or between operation/training periods;
- construction, pruning, and merging are all structural operations;
- constructive algorithms can be decomposed into processes for deciding when to modify structure, selecting what components are affected, and choosing parameter values for new or merged components.

This framing lets us compare algorithms that otherwise look unrelated. Dynamic Node Creation, Cascade-Correlation, Growing Neural Gas, evolving spiking neural networks, and structural-plasticity models can all be placed on the same map: what changes, what signal triggers the change, and how the new component is parameterized.

## The three-process lens

A compact way to use the thesis taxonomy is to ask three questions about any constructive learner.

### 1. When does the network change?

The thesis calls attention to performance evaluation processes: assessments of network state, operation, training, parameters, or component behaviour that can feed structural decisions.

Classic examples are mostly global. Dynamic Node Creation reacts to training behaviour in a backpropagation network. Cascade-Correlation repeatedly trains candidate units against residual error and installs the candidate that best explains the remaining error. In both cases, the growth decision is tied to a training objective for the network as a whole.

The thesis emphasizes that constructive systems can also use local performance. A neuron, synapse, or candidate component can be evaluated directly. This matters for spiking and biologically motivated simulations, where local events may be more natural than a global error signal.

### 2. What part of the network changes?

Construction can add neurons, synapses, or both. Pruning removes components. Merging combines similar components or their parameters. The thesis treats these as related structural operations rather than separate research islands.

That is a useful shift for this site. Earlier constructive-learning pages tend to emphasize growth, but mature constructive systems also need ways to avoid unbounded expansion. A richer review should therefore track both growth and contraction:

- what grows;
- what is frozen or stabilized;
- what can be pruned;
- what can be merged;
- what information is retained after a structural change.

### 3. How are new parameters chosen?

Adding a unit is not enough. The new component must receive useful initial parameters: synapse weights, thresholds, receptive fields, timing constants, or other model-specific values. The thesis names this a parameter calculation process.

This is one of the strongest bridges between Cascade-Correlation and later spiking work. Cascade-Correlation devotes training effort to candidate units before installation. Spiking constructive algorithms may instead estimate useful synapse weights from spike timing, local activity, or proxy-neuron events. Both are attempts to avoid adding arbitrary capacity: the new component should enter the system with some reason to help.

## Spike-timing-dependent construction

A central contribution of the thesis taxonomy is the category of spike-timing-dependent construction (STDC). The proposed distinction is precise:

A spiking neural network alone is not enough to make an algorithm STDC. A constructive algorithm performs STDC when spike times are inputs to, or control the flow of, constructive processes.

This distinction is valuable because it separates several cases that are easy to blur:

- a conventional constructive algorithm applied to spiking neurons;
- a spiking network with STDP but no structural construction;
- a constructive spiking network whose construction, pruning, or parameter calculation actually depends on spike timing.

For the web book, STDC gives us a clean spiking branch of the constructive-learning taxonomy. The growth signal is no longer only residual error or a training plateau. It can be a timing-dependent event or a local temporal pattern.

## How this connects to the existing site

The current anchor algorithms can be re-read through the thesis vocabulary:

- **Dynamic Node Creation**: construction is triggered by training/capacity behaviour; hidden units are added; new parameters are initialized or trained through the backpropagation workflow.
- **Cascade-Correlation**: candidate units are trained and evaluated by residual-error correlation; the selected unit is installed; incoming weights are frozen; later growth builds on previous installed features.
- **Recurrent Cascade-Correlation variants**: growth happens in recurrent architectures, raising questions about topology, sequence representation, and what structural constraints are imposed by the constructive process.

The thesis adds a spiking counterpart:

- **Spike-timing-dependent construction**: spike times can trigger constructive processes or supply information for parameter calculation.
- **Simulation expansion/contraction**: construction can be interpreted as moving neurons or synapses into the simulated set, while pruning can move them out.
- **Proxy-neuron construction**: hypothetical/proxy spike events can help estimate whether a neuron should be constructed and how its synapses should be parameterized.
- **Continual one-shot spike-pattern learning**: construction can add capacity for new spike patterns without retuning neurons that have already specialized.

## What this enables next

This thesis should not be converted wholesale into the website. The better path is to use it as a conceptual source for selective public artifacts:

1. theme definitions for spiking constructive learning;
2. paper records for important referenced algorithms;
3. short synthesis notes that connect chapters to the broader literature;
4. interactive modules that make one process visible at a time.

The first planned module, **Constructive Algorithm Taxonomy**, should visualize the three-process lens:

```text
performance evaluation  ->  structural operation  ->  parameter calculation
       when?                        what?                     how?
```

Later modules can specialize this frame for simulation expansion, STDP windows, proxy-neuron construction, and competitive spike-pattern growth.

## Active bundle bridge: eSNN/STDC lineage

Chapter 2 also gives the current `evolving-spiking-networks` bundle a useful organizing rule: do not treat every spiking or STDP-equipped model as constructive. The thesis frames spike-timing-dependent construction as a narrower case where spike times participate in the constructive process itself, either by supplying variables to performance/parameter calculations or by controlling when constructive steps run. That keeps the active bundle aligned with public review records for Schliebs2013, Wysoski2010, and Kasabov2013 while leaving method-specific details to their own paper reviews.

The same chapter is helpful because it describes eSNN-style algorithms as using a different sequence from classic error-triggered growth. Instead of first observing a global training plateau and then adding capacity, an eSNN-style pass may calculate candidate parameters for the current input first, then decide whether the candidate is distinct enough to become a new neuron or should be merged with an existing one. For the web book, that makes `parameter-calculation`, `local-performance-trigger`, and `pruning-and-merging` the safest thesis-derived themes to use when comparing eSNN/deSNN papers: they name the comparison axis without asserting unreviewed details about Wang2014, Roy2017, or later derivatives.

A cautious reading of the thesis STDC literature list also suggests a bundle boundary. Refractoriness-based construction, eSNN/deSNN derivatives, growing-pruning spiking classifiers, and structural-plasticity algorithms all belong in the broader constructive-spiking map, but they should not be collapsed into one mechanism. The next eSNN synthesis should therefore ask three public-review questions for each anchor: what event or interval runs the constructive process, what candidate parameters are calculated before a structure decision, and what operation distinguishes adding a new component from merging, pruning, or adapting an existing one.

## Stage 4 integration: simulation expansion/contraction

Chapter 3 adds a useful distinction for constructive spiking simulations: a structural change in a computer model does not always have to be narrated as a biological neuron being instantly born or deleted. The thesis separates the **memory representation** of components from the **simulated set** of components participating in network operation.

In that view:

- construction adds a neuron or synapse representation to computer memory;
- pruning removes a representation from computer memory;
- expansion transfers a member from a surrounding, non-simulated set into the simulated neuron/synapse set;
- contraction transfers a simulated member back out to the surrounding set.

The distinction is valuable for this review because it turns a pure capacity-control question into a modelling question. A constructive algorithm can be evaluated not only by whether it reduces error or detects a pattern, but also by whether the added or removed component would produce a plausible change in the simulated activity. Chapter 3's "plausible effects" idea is a practical bridge to later spiking modules: low-activity, weakly connected, or otherwise low-disruption additions are easier to interpret as expansion from a surrounding neural system than additions that cause sudden persistent shifts in spike rates or latencies.

This creates a planned visual module, **Simulation Expansion and Contraction**, that should show three sets side by side: simulated components, surrounding components, and components represented in memory. The first implementation should stay conceptual and avoid copying thesis figures wholesale; if a later pass uses source SVGs, it should copy only the specific asset needed and preserve provenance.

## Stage 6 integration: hidden-pattern STDP as a bounded bridge

Chapter 6 is useful for the active `stdp-hidden-pattern-construction` bundle because it frames the Masquelier hidden-pattern setting as a compatibility test between STDP simulations and constructive neuron insertion, not as proof that STDP alone grows structure. The thesis chapter starts from the already-public Masquelier-style question: can spike-timing-dependent plasticity tune synapses so a postsynaptic neuron responds near the beginning of a concealed repeating spike pattern? Its constructive extension asks a narrower modelling question: can a neuron introduced after a proxy event be initialized with synapse weights that let it reach comparable hidden-pattern detection behaviour?

That framing keeps the bundle cautious. The currently drafted Masquelier2008, Masquelier2009, Song2000, and Legenstein2005 reviews ground **synaptic selectivity**, timing-based competition, and single-neuron STDP learnability limits. The thesis-derived contribution is the bridge from those reviewed mechanisms to **parameter calculation** for a constructed component: proxy timing can define an eligibility window, and estimated or normalized STDP-like updates can be treated as candidate initialization rules for new synapses. It should not yet be presented as a reviewed public claim that hidden-pattern STDP automatically chooses the right network size.

Two constraints from the thesis source should shape future module or exercise work. First, Chapter 6 explicitly notes that its reproduced one-pattern setting does not test automatic network-size selection, because the number of hidden patterns is known in advance. Second, high presynaptic spike rates can make a proxy neuron fire indiscriminately, so proxy-triggered construction needs to be shown as a parameter-estimation scaffold with failure modes, not as a magic detector. A future timing-window exercise should therefore let learners compare predefined-neuron STDP selectivity with constructed-neuron initialization, while labelling automatic capacity control as an open question for the later competitive/multiple-pattern chapter.

### Evaluation lens: detector quality is not capacity choice

Chapter 6's data-collection section suggests a compact teaching lens for that comparison: track whether pattern presentations receive a response, whether spikes also occur outside the pattern, and how soon the first within-pattern response arrives. These correspond to hit coverage, false alarms, and response latency. They are useful observables for comparing predefined and constructed detectors, but they do not by themselves show that a constructive rule selected the right number of neurons. The public Masquelier2008 review supports onset-selective hidden-pattern detection, while the thesis supplies this cautious constructed-versus-predefined evaluation framing; exact thresholds and comparative outcomes remain thesis-specific results pending human review.

## Open verification notes

This draft is based primarily on the thesis abstract plus Chapter 2, Chapter 3, and a selective Chapter 6 pass over `06_hidden_spike_pattern/hidden_spike_pattern_detection.tex`. It is intended as a synthesis scaffold for the web book, not a human-reviewed final interpretation. Before marking it reviewed, check:

- the exact wording of the thesis definitions against Chapter 2;
- whether the public web-book paraphrases preserve the intended distinctions;
- which cited algorithms from the thesis bibliography should become first-class paper records;
- which thesis figures can be reused directly in the public site and under what attribution wording.
