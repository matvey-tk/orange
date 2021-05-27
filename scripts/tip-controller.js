const TIP_CONTROLLER_CACHE_PREFIX = "ORANGE_TIP_CONTROLLER_";

class TipController
{
    _id;
    _tipContainer;
    _hoverContainer;
    _mouseListener;
    _dismissCheckCallback;
    seen = false;

    constructor(id, tipContainer, hoverContainer, dismissCheckCallback)
    {
        this._id = id;
        this._tipContainer = tipContainer;
        this._hoverContainer = hoverContainer;
        this._dismissCheckCallback = dismissCheckCallback;

        this._checkCache();
        if (this.seen)
        {
            this.Dismiss(true);   
        }
        else
        {
            this._startListening();
        }
    }

    _checkCache()
    {
        let data = localStorage[TIP_CONTROLLER_CACHE_PREFIX + this._id];
        if (data)
        {
            this.seen = true;
        }
    }

    _setCache()
    {
        localStorage[TIP_CONTROLLER_CACHE_PREFIX + this._id] = 'SEEN';
    }

    _startListening()
    {
        if (!this._mouseListener)
        {
            this._hoverContainer.addEventListener("mouseover", this._mouseListener = (e) =>
            {
                let dismiss = true;
                if (this._dismissCheckCallback)
                {
                    dismiss = this._dismissCheckCallback(e);
                }
                if (dismiss)
                {
                    if (!this._seen)
                    {
                        this._seen = true;
                        this._setCache();
                    }
                    this.Dismiss();
                }
            });
        }
    }

    _stopListening()
    {
        if (this._mouseListener)
        {
            this._hoverContainer.removeEventListener("mouseover", this._mouseListener);
            this._mouseListener = null;
        }
    }

    Dismiss(instant = false)
    {
        this._stopListening();
        if (instant)
        {
            this._tipContainer.style.display = "none";
        }
        else
        {
            this._tipContainer.classList.add("-sg-fadeout");
            setTimeout(() =>
            {
                this._tipContainer.style.display = "none";
            }, 300);
        }
    }
}

// Sidebar tip controller.
let sidebarTipContainer = document.getElementById("sidebar-tip");
if (sidebarTipContainer)
{
    let sidebarHoverContainer = sidebarTipContainer.parentElement.parentElement;
    
    let drillUpSidebarButton = (element) =>
    {
        if (!element)
        {
            return null;
        }
        else if (element.classList && element.classList.contains("sidebar-button"))
        {
            return element;
        }
        else if (element.parentElement)
        {
            return drillUpSidebarButton(element.parentElement);
        }
        else
        {
            return null;
        }
    };
    
    new TipController("sidebar", sidebarTipContainer, sidebarHoverContainer, (e) =>
    {
        if (e.target)
        {
            let button = drillUpSidebarButton(e.target);
            return !!button;
        }
        return false;
    });
}

// Cases tip controller.
let casesTipContainer = document.getElementById("cases-tip");
if (casesTipContainer)
{
    let casesHoverContainer = casesTipContainer.parentElement;
    new TipController("cases", casesTipContainer, casesHoverContainer);
}