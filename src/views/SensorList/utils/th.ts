import { useI18n } from "vue-i18n";

export const getThTable = () => {
    const { t } = useI18n()

    return [
        {
            label: 'ID',
            iconUp: 'pi-sort-alpha-up',
            iconDown: 'pi-sort-alpha-down',
            keySort: 'id'
        },
        {
            label: t('sensorList.table.name'),
            iconUp: 'pi-sort-alpha-up',
            iconDown: 'pi-sort-alpha-down',
            keySort: 'name'
        },
        {
            label: t('sensorList.table.location'),
            iconUp: 'pi-sort-alpha-up',
            iconDown: 'pi-sort-alpha-down',
            keySort: 'location'
        },
        {
            label: t('sensorList.table.lastValue'),
            iconUp: 'pi-sort-numeric-up',
            iconDown: 'pi-sort-numeric-down',
            keySort: 'lastValue'
        },
        {
            label: t('sensorList.table.status'),
            iconUp: 'pi pi-sort-alt',
            keySort: 'status'
        },
        {
            label: t('sensorList.table.fetch'),
        }
    ]
}
