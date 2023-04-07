import React from 'react';
import Modal from 'react-native-modal';
import {useContextApp} from 'Context';
import {AppBar} from 'Components/AppBar';
import {Avatar, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {
  Info,
  Text,
  Item,
  Title,
  height,
  Header,
  Controls,
  Container,
  ModalArea,
  ControlsTitle,
  TextFarm,
  Ptax,
  ControlHeaders,
  TextHeader,
  PriceArea,
  TextPrice,
  DatePrice,
  BuyPrice,
  SellPrice,
  Values,
  Average,
} from './styles';
import axios from 'axios';
import {IPrice} from 'Interfaces';
import {AnimatedNumber} from 'Components/AnimatedNumber';
import {dateParam, dateToLocal, now, todayMinus} from 'Utils/date';
import {ScrollView} from 'react-native';
import {currency, formatCurrency} from 'Utils/currency';
import {Loading} from 'Components/Loading';
import {ShadowView} from 'Components/ShadowView';

const chartIcon = require('../../Assets/chart.png');

export const Price = () => {
  const navigation = useNavigation();
  const {farms, farm, changeFarm, seasons, season, changeSeason} =
    useContextApp();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sell, setSell] = React.useState<number>(0);
  const [buy, setBuy] = React.useState<number>(0);
  const [hour, setHour] = React.useState<Date | undefined>(undefined);
  const [search, setSearch] = React.useState<IPrice | undefined>(undefined);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleRetrivePtax = async () => {
    setSearch(undefined);
    const end = new Date();
    const start = new Date(todayMinus(100));
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dateParam(
      start,
    )}'&@dataFinalCotacao='${dateParam(
      end,
    )}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;
    const result = await axios.get<IPrice>(url);
    if (result.data) {
      setSearch(result.data);
    }
  };

  const handleOnCloseModal = () => {
    setSearch(undefined);
    setModalOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      const date = new Date();
      setHour(date);
      const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}'&$top=100&$format=json`;
      const result = await axios.get<IPrice>(url);
      if (result.data) {
        setBuy(result.data.value[0]?.cotacaoCompra);
        setSell(result.data.value[0]?.cotacaoVenda);
      }
    })();
  }, []);

  return (
    <ShadowView>
      <Container onPress={handleOpen}>
        <Avatar.Image
          source={chartIcon}
          size={130}
          style={{backgroundColor: '#fff'}}
        />
        <Info>
          <Header>
            <Title>Dólar Ptax - {hour?.toLocaleTimeString()}</Title>
          </Header>
          <Ptax>
            <Text>{`Compra   `}</Text>
            <Text>
              <AnimatedNumber currency="BRL" number={buy} digits={4} />
            </Text>
          </Ptax>
          <Ptax>
            <Text>{`Venda     `}</Text>
            <Text>
              <AnimatedNumber currency="BRL" number={sell} digits={4} />
            </Text>
          </Ptax>
          <Ptax>
            <Text>{`Média     `}</Text>
            <Text>
              <AnimatedNumber
                currency="BRL"
                number={(sell + buy) / 2}
                digits={4}
              />
            </Text>
          </Ptax>
        </Info>
        <Modal
          onModalShow={handleRetrivePtax}
          animationIn="slideInLeft"
          animationInTiming={400}
          animationOutTiming={400}
          animationOut={'slideOutRight'}
          isVisible={modalOpen}
          style={{
            width: '100%',
            height: height,
            margin: 0,
            justifyContent: 'flex-start',
          }}>
          <ModalArea>
            <AppBar title="Cotações Ptax" backHandle={handleOnCloseModal} />
            <ControlHeaders>
              <DatePrice>
                <TextHeader>Data</TextHeader>
              </DatePrice>
              <BuyPrice>
                <TextHeader>Compra</TextHeader>
              </BuyPrice>
              <SellPrice>
                <TextHeader>Venda</TextHeader>
              </SellPrice>
              <Average>
                <TextHeader>Média</TextHeader>
              </Average>
            </ControlHeaders>
            <ScrollView>
              {search !== undefined ? (
                search?.value.map((e, i) => (
                  <PriceArea key={i} index={i}>
                    <DatePrice>
                      <Text>{dateToLocal(e.dataHoraCotacao)}</Text>
                    </DatePrice>
                    <BuyPrice>
                      <Text>
                        R$ {formatCurrency(e.cotacaoCompra, 'BRL', 4)}
                      </Text>
                    </BuyPrice>
                    <SellPrice>
                      <Text>R$ {formatCurrency(e.cotacaoVenda, 'BRL', 4)}</Text>
                    </SellPrice>
                    <Average>
                      <Text>
                        R${' '}
                        {formatCurrency(
                          (e.cotacaoVenda + e.cotacaoCompra) / 2,
                          'BRL',
                          4,
                        )}
                      </Text>
                    </Average>
                  </PriceArea>
                ))
              ) : (
                <Loading />
              )}
            </ScrollView>
          </ModalArea>
        </Modal>
      </Container>
    </ShadowView>
  );
};
