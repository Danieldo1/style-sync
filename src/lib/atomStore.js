import {atom} from "jotai";

export const countAtom = atom(0);
export const incrementAtomCount = atom(null, (get, set) => {
    set(countAtom, get(countAtom) + 1);
    return get(countAtom);
})
export const decrementAtomCount = atom(null, (get, set) => {
    set(countAtom, get(countAtom) - 1);
    return get(countAtom);
})

