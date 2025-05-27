import CalendarButton from './components/CalendarButton';
import CalendarLine from './components/CalendarLine';

function CalendarSection(){
    return(
    <div className="flex gap-2">
        <CalendarButton />
        <CalendarLine />
    </div>
    );
};

export default CalendarSection;