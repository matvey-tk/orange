class CaseController
{
    _caseContainer;
    _toggled = false;

    constructor(caseContainer)
    {
        this._caseContainer = caseContainer;
        this._startListeners();
    }

    _startListeners()
    {
        let toggle = this._caseContainer.getElementsByClassName("toggle")[0];
        toggle.addEventListener("mouseup", () =>
        {
            this._toggled = !this._toggled;
            this._caseContainer.setAttribute("toggled", this._toggled);
        });
    }
}

let cases = document.getElementsByClassName("case");
for (let i = 0; i < cases.length; i++)
{
    let caseContainer = cases[i];
    new CaseController(caseContainer);
}