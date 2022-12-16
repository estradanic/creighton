import {createSignal, onMount} from "solid-js";
import Parse from "parse";
import { Observation } from "../types/ObservationTypes";

const [observations, setObservations] = createSignal<Observation[]>([]);
const [loading, setLoading] = createSignal(true);

const observationsStore = () => {
    onMount(() => {
        new Parse.Query<Parse.Object<Observation>>("observation").findAll()
            .then((results) => setObservations(results.map((result) => ({ ...result.attributes, id: result.id }))))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
      });

    return {
        observations,
        loading,
        setObservations,
    };
};

export default observationsStore;
