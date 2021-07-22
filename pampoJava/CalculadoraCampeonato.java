import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class CalculadoraCampeonato 
{
    public static void main(String[] args) 
    {
        final JLabel labelPontosPorVitoria = new JLabel();
        labelPontosPorVitoria.setText("Pontos adquiridos a cada vitória:");
        final JTextField pontosPorVitoria = new JTextField(2);

        final JLabel labelJogosRestantes = new JLabel();
        labelJogosRestantes.setText("Jogos restantes:");
        final JTextField jogosRestantes = new JTextField(2);

        final JLabel labelLider = new JLabel();
        labelLider.setText("Pontuação atual do líder:");
        final JTextField lider = new JTextField(2);

        final JLabel labelLanterna = new JLabel();
        labelLanterna.setText("Pontuação atual do lanterna");
        final JTextField lanterna = new JTextField(2);
        
        final JPanel panel = new JPanel();
        panel.add(labelPontosPorVitoria);
        panel.add(pontosPorVitoria);
        panel.add(labelJogosRestantes);
        panel.add(jogosRestantes);
        panel.add(labelLider);
        panel.add(lider);
        panel.add(labelLanterna);
        panel.add(lanterna);
        
        final byte inputPanel = (byte) JOptionPane.showConfirmDialog(null, panel, "Por favor, insira as informações abaixo", JOptionPane.OK_CANCEL_OPTION);

        if (inputPanel == JOptionPane.OK_OPTION)
        {
            final byte bytePontosPorVitoria = Byte.parseByte(pontosPorVitoria.getText());
            final byte byteJogosRestantes = Byte.parseByte(jogosRestantes.getText());
            final byte byteLider = Byte.parseByte(lider.getText());
            final byte byteLanterna = Byte.parseByte(lanterna.getText()); 
            
            final byte jogos = (byte) Math.floor((((byteLider - byteLanterna) / bytePontosPorVitoria)));

            if (jogos >= byteJogosRestantes)
            {
                JOptionPane.showMessageDialog(null, "Não há como alcançar a pontuação do líder.", null, JOptionPane.WARNING_MESSAGE); 
            }
            else
            {
                JOptionPane.showMessageDialog(null, String.format("Para alcançar a pontuação do líder, o lanterna precisará ganhar %d jogos.", jogos));
            }
        }
        else
        {
            System.out.println("Operação cancelada pelo usuário.");
        }
        System.exit(0);
    }
}