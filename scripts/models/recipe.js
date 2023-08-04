class Recipe {
    constructor(data){
        this._name = data.name;
		this._description = data.description;
		this._ingredients = data.ingredients;
		this._time = data.time;
		this._picture = `/assets/photos/${data.image}`;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get ingredients() {
        return this._ingredients;
    }

    get time() {
        return this._time;
    }

    get picture() {
        return `/assets/photos/${this._image}`;
    }

}