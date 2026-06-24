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

## Open verification notes

This draft is based primarily on the thesis abstract and Chapter 2 source. It is intended as a synthesis scaffold for the web book, not a human-reviewed final interpretation. Before marking it reviewed, check:

- the exact wording of the thesis definitions against Chapter 2;
- whether the public web-book paraphrases preserve the intended distinctions;
- which cited algorithms from the thesis bibliography should become first-class paper records;
- which thesis figures can be reused directly in the public site and under what attribution wording.
